'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import type { ChatMessage } from '@/lib/types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInterface({ messages, onSendMessage, isLoading, disabled }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Refinement Chat</h3>
      </div>

      {disabled && (
        <div className="p-4 bg-gray-50 rounded-md text-sm text-gray-600">
          Chat is disabled after saving. Start a new session to make more changes.
        </div>
      )}

      {/* Messages */}
      <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            <p>Messages will appear here. You can request changes like:<br/>
            "Make it more technical" or "Emphasize leadership experience"</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : msg.role === 'system'
                    ? 'bg-gray-100 text-gray-700 italic'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={disabled ? "Chat disabled" : "Type your refinement request..."}
          disabled={isLoading || disabled}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading || disabled}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>

      <div className="text-xs text-gray-500">
        <p>💡 Example requests:</p>
        <ul className="mt-1 space-y-1 list-disc list-inside">
          <li>"Make the CV more technical"</li>
          <li>"Emphasize my leadership experience in the letter"</li>
          <li>"Shorten the motivation letter to 300 words"</li>
        </ul>
      </div>
    </div>
  );
}
