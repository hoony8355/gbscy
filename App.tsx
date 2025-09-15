
import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GeneratePage from './pages/GeneratePage';
import ViewArticlePage from './pages/ViewArticlePage';
import { initialArticles } from './constants';
import type { Article } from './types';

export interface ArticleContextType {
  articles: Article[];
  addArticle: (article: Article) => void;
}

export const ArticleContext = createContext<ArticleContextType | null>(null);

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  const addArticle = (newArticle: Article) => {
    // Prevent adding articles with duplicate slugs
    if (!articles.some(article => article.slug === newArticle.slug)) {
      setArticles(prevArticles => [newArticle, ...prevArticles]);
    }
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle }}>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/generate" element={<GeneratePage />} />
              <Route path="/article/:slug" element={<ViewArticlePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ArticleContext.Provider>
  );
};

export default App;
