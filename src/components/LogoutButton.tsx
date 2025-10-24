'use client';

import { useAuth } from '@/contexts/AuthContext';

export function LogoutButton() {
  const { logout, user } = useAuth();

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600 dark:text-gray-400">
        Welcome, <span className="font-semibold">{user?.username}</span>
      </span>
      <button
        onClick={logout}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Logout
      </button>
    </div>
  );
}
