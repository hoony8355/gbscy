
import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link to={`/article/${article.slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-transform transform group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="p-6 flex flex-col flex-grow">
          <p className="text-sm text-gray-500 mb-2">{article.generatedDate}</p>
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 flex-grow mb-4">{article.metaDescription}</p>
          <div className="mt-auto text-teal-500 font-semibold group-hover:underline">
            자세히 보기 &rarr;
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
