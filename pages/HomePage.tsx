
import React, { useContext } from 'react';
import { ArticleContext } from '../App';
import ArticleCard from '../components/ArticleCard';
import { useSeo } from '../hooks/useSeo';

const HomePage: React.FC = () => {
  const articleContext = useContext(ArticleContext);
  useSeo('고불소치약 정보 허브 | 홈', 'AI가 생성하는 고불소치약에 대한 모든 정보. 효능, 부작용, 올바른 사용법 등 최신 아티클을 확인하세요.');

  return (
    <div className="space-y-12">
      <section className="text-center bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          AI가 제공하는 고불소치약 전문 정보
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          최신 AI 기술을 활용하여 생성된 고불소치약에 대한 깊이 있고 신뢰할 수 있는 아티클을 만나보세요. 궁금했던 모든 정보를 쉽고 빠르게 얻을 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-teal-500 pl-4">최신 아티클</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articleContext?.articles.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
