import React, { useState, createContext, useMemo } from 'react';
// FIX: Using namespace import for react-router-dom to handle potential module resolution issues.
import * as ReactRouterDOM from 'react-router-dom';
import type { Article } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GeneratePage from './pages/GeneratePage';
import ViewArticlePage from './pages/ViewArticlePage';
import { initialArticles } from './constants';

interface ArticleContextType {
  articles: Article[];
  addArticle: (article: Article) => void;
}

export const ArticleContext = createContext<ArticleContextType | null>(null);

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  const addArticle = (article: Article) => {
    setArticles(prevArticles => [article, ...prevArticles]);
  };

  const contextValue = useMemo(() => ({ articles, addArticle }), [articles]);

  return (
    <ArticleContext.Provider value={contextValue}>
      <ReactRouterDOM.HashRouter>
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <ReactRouterDOM.Routes>
              <ReactRouterDOM.Route path="/" element={<HomePage />} />
              <ReactRouterDOM.Route path="/generate" element={<GeneratePage />} />
              <ReactRouterDOM.Route path="/article/:slug" element={<ViewArticlePage />} />
            </ReactRouterDOM.Routes>
          </main>
          <Footer />
        </div>
      </ReactRouterDOM.HashRouter>
    </ArticleContext.Provider>
  );
};

export default App;
