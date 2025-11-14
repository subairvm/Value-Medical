import React from 'react';

const Spinner: React.FC<{ fullPage?: boolean }> = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sky-50">
        <div className="w-16 h-16 border-4 border-t-teal-500 border-r-teal-500 border-b-teal-500 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-12 h-12 border-4 border-t-teal-500 border-r-teal-500 border-b-teal-500 border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
