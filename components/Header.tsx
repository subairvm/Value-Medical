import React from 'react';
import { auth } from '../firebase';
import { User } from 'firebase/auth';

interface HeaderProps {
    user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <header className="bg-white shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
             <svg
              className="w-8 h-8 text-teal-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <h1 className="text-xl font-bold text-slate-800">
              Vital<span className="text-teal-500">Track</span>
            </h1>
          </div>
          {user && (
            <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600 hidden sm:block">
                    Welcome, {user.displayName || user.email}
                </span>
                <button
                    onClick={handleSignOut}
                    className="px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                >
                    Sign Out
                </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
