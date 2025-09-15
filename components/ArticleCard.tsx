
import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{article.generatedDate}</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          <Link to={`/article/${article.slug}`} className="hover:text-teal-600 transition-colors">
            {article.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4">{article.metaDescription}</p>
        <Link
          to={`/article/${article.slug}`}
          className="font-semibold text-teal-600 hover:text-teal-700 transition-colors"
        >
          더 읽어보기 &rarr;
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
