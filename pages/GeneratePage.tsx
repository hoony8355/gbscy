
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateArticle } from '../services/geminiService';
import { ArticleContext } from '../App';
import LoadingSpinner from '../components/LoadingSpinner';
import { useSeo } from '../hooks/useSeo';
import type { Article } from '../types';
import type { ArticleContextType } from '../App';


const GeneratePage: React.FC = () => {
  useSeo('AI 아티클 생성', '새로운 주제와 키워드로 고불소치약에 대한 SEO 최적화 아티클을 생성합니다.');
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const articleContext = useContext(ArticleContext) as ArticleContextType;
  const navigate = useNavigate();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('아티클 주제를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const keywordsArray = keywords.split(',').map(kw => kw.trim()).filter(Boolean);
      const newArticle: Article = await generateArticle(topic, keywordsArray);
      
      articleContext.addArticle(newArticle);
      navigate(`/article/${newArticle.slug}`);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AI 아티클 생성하기</h1>
        <p className="text-gray-600 mb-6">
          생성하고 싶은 아티클의 주제와 핵심 키워드를 입력해주세요. AI가 SEO에 최적화된 전문적인 아티클을 작성해 드립니다.
        </p>
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-lg font-medium text-gray-700 mb-2">
                아티클 주제
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                placeholder="예: 어린이 고불소치약 사용의 장단점"
                required
              />
            </div>
            <div>
              <label htmlFor="keywords" className="block text-lg font-medium text-gray-700 mb-2">
                핵심 키워드 (쉼표로 구분)
              </label>
              <input
                type="text"
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                placeholder="예: 어린이, 충치 예방, 불소, 안전성"
              />
            </div>
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">오류 발생</p>
                <p>{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400"
            >
              {isLoading ? '생성 중...' : '아티클 생성하기'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default GeneratePage;
