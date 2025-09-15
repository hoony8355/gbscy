
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} AI 고불소치약 정보 허브. All Rights Reserved.</p>
        <p className="text-sm mt-1">Powered by Google Gemini & React</p>
      </div>
    </footer>
  );
};

export default Footer;
