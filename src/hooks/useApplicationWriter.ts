import { useState, useCallback, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { writerApi } from '@/lib/api';
import type {
  WriterStartRequest,
  ApplicationMaterials,
  ChatMessage,
} from '@/lib/types';

export function useApplicationWriter() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [saveResult, setSaveResult] = useState<{
    success: boolean;
    message: string;
    filePaths?: any;
  } | null>(null);

  // Start a new writer session
  const startSession = useCallback(async (request: WriterStartRequest) => {
    setIsStarting(true);
    setSaveResult(null);
    try {
      const response = await writerApi.startSession(request);
      setSessionId(response.session_id);

      // Add system message to chat
      setChatHistory([
        {
          role: 'system',
          content: 'Generating customized application materials...',
          timestamp: new Date().toISOString(),
        },
      ]);

      return response.session_id;
    } catch (error) {
      console.error('Error starting writer session:', error);
      throw error;
    } finally {
      setIsStarting(false);
    }
  }, []);

  // Poll for session status and materials
  const {
    data: sessionData,
    isLoading: isLoadingSession,
    error: sessionError,
    refetch: refetchSession,
  } = useQuery({
    queryKey: ['writerSession', sessionId],
    queryFn: () => writerApi.getSession(sessionId!),
    enabled: !!sessionId,
    refetchInterval: (query) => {
      // Stop polling when status is completed or failed
      const data = query.state.data;
      if (data?.status === 'completed' || data?.status === 'failed') {
        return false;
      }
      return 2000; // Poll every 2 seconds
    },
  });

  const materials: ApplicationMaterials | undefined = sessionData?.materials;
  const status = sessionData?.status;
  const isCompleted = status === 'completed';
  const isFailed = status === 'failed';
  const isRunning = status === 'running' || status === 'pending';

  // Refine materials with a user request
  const refineMaterials = useCallback(
    async (refinementRequest: string) => {
      if (!sessionId) {
        throw new Error('No active session');
      }

      setIsRefining(true);

      // Add user message to chat
      const userMessage: ChatMessage = {
        role: 'user',
        content: refinementRequest,
        timestamp: new Date().toISOString(),
      };
      setChatHistory((prev) => [...prev, userMessage]);

      try {
        await writerApi.refineSession(sessionId, { refinement_request: refinementRequest });

        // Add system message
        const systemMessage: ChatMessage = {
          role: 'system',
          content: 'Processing your refinement request...',
          timestamp: new Date().toISOString(),
        };
        setChatHistory((prev) => [...prev, systemMessage]);
      } catch (error) {
        console.error('Error refining materials:', error);

        // Add error message to chat
        const errorMessage: ChatMessage = {
          role: 'system',
          content: 'Failed to process refinement. Please try again.',
          timestamp: new Date().toISOString(),
        };
        setChatHistory((prev) => [...prev, errorMessage]);

        throw error;
      } finally {
        setIsRefining(false);
      }
    },
    [sessionId]
  );

  // Save materials to files
  const saveMaterials = useCallback(async () => {
    if (!sessionId) {
      throw new Error('No active session');
    }

    setIsSaving(true);
    try {
      const result = await writerApi.saveSession(sessionId);
      setSaveResult({
        success: result.success,
        message: result.message,
        filePaths: result.file_paths,
      });
      return result;
    } catch (error) {
      console.error('Error saving materials:', error);
      setSaveResult({
        success: false,
        message: 'Failed to save materials. Please try again.',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [sessionId]);

  // Reset the session
  const resetSession = useCallback(() => {
    setSessionId(null);
    setChatHistory([]);
    setSaveResult(null);
  }, []);

  // Track the last completed timestamp to avoid duplicate messages
  const lastCompletedTimestamp = useRef<string | null>(null);

  // Update chat history when materials are completed
  useEffect(() => {
    if (isCompleted && materials && sessionData?.completed_at) {
      // Only process if this is a new completion
      if (lastCompletedTimestamp.current !== sessionData.completed_at) {
        lastCompletedTimestamp.current = sessionData.completed_at;

        setChatHistory((prev) => {
          if (prev.length === 0) return prev;

          const lastMessage = prev[prev.length - 1];

          // Only replace if the last message is a system message
          if (lastMessage.role === 'system') {
            let assistantContent = '';
            if (lastMessage.content.includes('Processing')) {
              assistantContent = 'Materials updated successfully! You can preview them below or request further changes.';
            } else if (lastMessage.content.includes('Generating')) {
              assistantContent = 'Initial materials generated! Review them below and let me know if you need any changes.';
            }

            if (assistantContent) {
              const assistantMessage: ChatMessage = {
                role: 'assistant',
                content: assistantContent,
                timestamp: new Date().toISOString(),
              };
              return [...prev.slice(0, -1), assistantMessage];
            }
          }

          return prev;
        });
      }
    }
  }, [isCompleted, materials, sessionData?.completed_at]);

  return {
    // Session management
    startSession,
    resetSession,
    sessionId,
    isStarting,

    // Materials and status
    materials,
    status,
    isCompleted,
    isFailed,
    isRunning,
    isLoadingSession,
    sessionError,
    refetchSession,

    // Refinement
    refineMaterials,
    isRefining,
    chatHistory,

    // Saving
    saveMaterials,
    isSaving,
    saveResult,
  };
}
