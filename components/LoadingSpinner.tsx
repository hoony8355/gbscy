
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      <p className="text-lg font-semibold text-gray-700">AI가 아티클을 생성 중입니다...</p>
      <p className="text-sm text-gray-500">잠시만 기다려 주세요.</p>
    </div>
  );
};

export default LoadingSpinner;
