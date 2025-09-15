
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleContext } from '../App';
import { generateArticle } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';
import { useSeo } from '../hooks/useSeo';

const GeneratePage: React.FC = () => {
  useSeo('새 아티클 생성 | 고불소치약 정보 허브', '새로운 고불소치약 관련 아티클을 AI로 즉시 생성해보세요.');
  const [topic, setTopic] = useState<string>('고불소치약 부작용과 예방법');
  const [keywords, setKeywords] = useState<string>('치아 불소증, 올바른 사용량, 어린이');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const articleContext = useContext(ArticleContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('아티클 주제를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const keywordList = keywords.split(',').map(k => k.trim()).filter(Boolean);
      const newArticle = await generateArticle(topic, keywordList);
      articleContext?.addArticle(newArticle);
      navigate(`/article/${newArticle.slug}`);
    } catch (err) {
      setError('아티클 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">AI 아티클 생성기</h1>
        <p className="text-gray-600 mt-2">
          고불소치약과 관련된 주제와 핵심 키워드를 입력하여 SEO에 최적화된 아티클을 생성하세요.
        </p>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-lg font-medium text-gray-700 mb-2">
              아티클 주제
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="예: 고불소치약과 일반치약의 차이점"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="예: 불소 함량, 충치 예방, 사용 대상"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? '생성 중...' : '✨ 아티클 생성하기'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default GeneratePage;
