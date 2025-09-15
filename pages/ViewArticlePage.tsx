
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleContext } from '../App';
import { useSeo } from '../hooks/useSeo';

const ViewArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const articleContext = useContext(ArticleContext);
  
  // Directly find the article from context. This will re-render if context changes.
  const article = articleContext?.articles.find(a => a.slug === slug);

  useSeo(article?.title || '아티클을 찾을 수 없습니다', article?.metaDescription || '');

  if (!articleContext) {
      // This can happen if the context provider is not available yet, providing a fallback.
      return <div className="text-center py-10"><p>Loading...</p></div>;
  }

  if (!article) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">404 - 아티클을 찾을 수 없습니다</h1>
        <p className="text-gray-600 mb-6">요청하신 페이지를 찾을 수 없습니다. 주소가 올바른지 확인해주세요.</p>
        <Link to="/" className="bg-teal-600 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-700">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          {article.title}
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          게시일: {article.generatedDate}
        </p>
      </header>
      
      <div className="prose prose-lg max-w-none prose-h1:text-3xl prose-h2:text-2xl prose-h2:border-b prose-h2:pb-2 prose-h2:mt-8 prose-a:text-teal-600 hover:prose-a:text-teal-700">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.markdownContent}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default ViewArticlePage;
