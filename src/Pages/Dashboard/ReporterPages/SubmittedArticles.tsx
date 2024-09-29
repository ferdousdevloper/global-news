import React, { useEffect, useState } from 'react';

const SubmittedArticles: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]); // Replace `any` with your article type

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('http://localhost:3001/submitted-articles'); // Update with your API endpoint
      const data = await response.json();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submitted Articles</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td className="border px-4 py-2">{article.title}</td>
              <td className="border px-4 py-2">
                {/* Actions like edit or delete can go here */}
                <button className="text-blue-600">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedArticles;
