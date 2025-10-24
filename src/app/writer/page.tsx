import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LogoutButton } from '@/components/LogoutButton';
import { WriterPage } from '@/components/ApplicationWriter/WriterPage';

export default function Writer() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logout */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
            <a href="/" className="text-sm text-blue-600 hover:text-blue-700">
              ← Back to Dashboard
            </a>
            <LogoutButton />
          </div>
        </div>

        {/* Writer Page */}
        <WriterPage />
      </div>
    </ProtectedRoute>
  );
}
