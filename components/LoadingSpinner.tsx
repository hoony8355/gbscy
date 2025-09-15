import React, { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  messages?: string[];
}

const defaultMessages = [
  "AI가 아티클을 생성 중입니다...",
  "최신 정보를 분석하고 있습니다...",
  "SEO에 최적화된 문장을 다듬는 중...",
  "전문적인 내용을 구성하고 있습니다...",
  "거의 다 완성되어 갑니다!",
];

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ messages = defaultMessages }) => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
    }, 2000); // 2초마다 메시지 변경

    return () => clearInterval(intervalId);
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      <p className="text-lg font-semibold text-gray-700">{currentMessage}</p>
      <p className="text-sm text-gray-500">잠시만 기다려 주세요.</p>
    </div>
  );
};

export default LoadingSpinner;