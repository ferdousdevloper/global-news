import React, { useEffect, useState } from 'react';

interface Article {
  id: string;
  title: string;
  summary: string;
}

const SavedArticles: React.FC = () => {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Fetch saved articles from the backend or use dummy data
    const fetchSavedArticles = async () => {
      const articles: Article[] = [
        {
          id: '1',
          title: 'Understanding TypeScript',
          summary: 'A brief introduction to TypeScript and its advantages.',
        },
        {
          id: '2',
          title: 'React Hooks in Depth',
          summary: 'An in-depth look into the world of React hooks.',
        },
      ];
      setSavedArticles(articles);
    };

    fetchSavedArticles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Saved Articles</h1>
      {savedArticles.length > 0 ? (
        <ul className="space-y-4">
          {savedArticles.map((article) => (
            <li
              key={article.id}
              className="border p-4 rounded-lg shadow-md bg-white hover:bg-gray-100 transition duration-300"
            >
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600">{article.summary}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No saved articles yet.</p>
      )}
    </div>
  );
};

export default SavedArticles;
