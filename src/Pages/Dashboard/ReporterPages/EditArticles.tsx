import React, { useState, useEffect } from 'react';

const EditArticles: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]); // Replace `any` with your article type
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('http://localhost:3001/submitted-articles'); // Update with your API endpoint
      const data = await response.json();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  const handleEdit = (article: any) => {
    setSelectedArticle(article); // Set selected article for editing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedArticle) {
      // API call to update the article
      console.log('Article Updated:', selectedArticle);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Articles</h1>
      {selectedArticle ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              value={selectedArticle.title}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, title: e.target.value })}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Content:</label>
            <textarea
              value={selectedArticle.content}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, content: e.target.value })}
              className="border p-2 w-full h-48"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Update Article
          </button>
        </form>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              {article.title} <button onClick={() => handleEdit(article)} className="text-blue-600">Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EditArticles;
