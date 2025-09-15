
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArticleContext } from '../App';
import type { Article } from '../types';
import { useSeo } from '../hooks/useSeo';

// Define the type for the global 'marked' object
declare global {
  interface Window {
    marked: {
      parse(markdown: string): string;
    };
  }
}

const ViewArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const articleContext = useContext(ArticleContext);
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const foundArticle = articleContext?.articles.find(a => a.slug === slug) ?? null;
    setArticle(foundArticle);
  }, [slug, articleContext?.articles]);
  
  useSeo(article?.title ?? '아티클', article?.metaDescription ?? '');

  if (!article) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">404 - 아티클을 찾을 수 없습니다.</h1>
        <p className="text-gray-600 mb-8">요청하신 페이지를 찾을 수 없습니다. 주소가 올바른지 확인해주세요.</p>
        <Link to="/" className="bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  const getRenderedHTML = () => {
    if (window.marked) {
      return { __html: window.marked.parse(article.markdownContent) };
    }
    return { __html: article.markdownContent.replace(/\n/g, '<br />') };
  };

  return (
    <article className="max-w-4xl mx-auto bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg">
      <header className="mb-8 border-b pb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          {article.title}
        </h1>
        <p className="mt-4 text-gray-500">게시일: {article.generatedDate}</p>
      </header>
      <div
        className="prose prose-lg max-w-none prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h2:border-b prose-h2:pb-2 prose-h2:mt-8 prose-a:text-teal-600 hover:prose-a:text-teal-700"
        dangerouslySetInnerHTML={getRenderedHTML()}
      />
    </article>
  );
};

export default ViewArticlePage;
