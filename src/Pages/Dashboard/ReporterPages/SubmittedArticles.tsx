import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { Toaster } from 'react-hot-toast';

interface Article {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  region: string;
  timestamp: string;
  breaking_news: boolean;
  popular_news: boolean;
  isLive: boolean;
}

const SubmittedArticles: React.FC = () => {
  const { user, loading } = useAuth() || {};
  const queryClient = useQueryClient();

  // Fetch articles using TanStack Query
  const { data: articles = [], refetch } = useQuery<Article[]>({
    queryKey: ['articles', user?.email],
    queryFn: async () => {
      if (user?.email) {
        const response = await axios.get(`http://localhost:3001/news/my-articles/${user.email}`);
        return response.data;
      }
      return [];
    },
    enabled: !!user?.email, // Only fetch when user email is available
  });

  // Mutation to delete an article
  const deleteArticleMutation = useMutation<void, Error, string>({
    mutationFn: (articleId: string) => {
      return axios.delete(`http://localhost:3001/news/delete-article/${articleId}`);
    },
    onSuccess: () => {
      // Refetch articles after successful deletion only if the user email is defined
      if (user?.email) {
        queryClient.invalidateQueries({
          queryKey: ['articles', user.email],
        });
      }
    },
    onError: (error) => {
      console.error('Error deleting article:', error);
    },
  });

  // Handle delete article with SweetAlert2 confirmation
  const handleDelete = (articleId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteArticleMutation.mutate(articleId);
        Swal.fire('Deleted!', 'Your article has been deleted.', 'success');
      }
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user found. Please log in.</p>;
  }

  return (
    <div className="p-6 glass bg-neutral-900 min-h-screen">
      <Toaster></Toaster>
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-100">Submitted Articles</h1>
      <hr className="my-10 border-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article._id} className="shadow-lg bg-neutral-900 rounded-lg overflow-hidden transform transition hover:scale-105 duration-300 glass">
              <img
                src={article.image || 'https://via.placeholder.com/400x200'} // Placeholder if no image is available
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-100">{article.title}</h2>
                <p className="text-gray-100 text-sm">
                  {article.description.slice(0, 100)}...
                </p>
                <div className="mt-4">
                  <p className="text-xs text-gray-100">
                    <strong>Category:</strong> {article.category}
                  </p>
                  <p className="text-xs text-gray-100">
                    <strong>Region:</strong> {article.region}
                  </p>
                  <p className="text-xs text-gray-100">
                    <strong>Date:</strong> {new Date(article.timestamp).toLocaleString()}
                  </p>
                  {article.breaking_news && (
                    <p className="text-xs text-red-500">
                      <strong>Breaking News</strong>
                    </p>
                  )}
                  {article.popular_news && (
                    <p className="text-xs text-blue-500">
                      <strong>Popular News</strong>
                    </p>
                  )}
                  <p className="text-xs text-gray-200">
                    <strong>Status:</strong> {article.isLive ? 'Live' : 'Normal'}
                  </p>
                </div>
                <div className="flex justify-evenly mt-4">
                  {/* Edit button */}
                  <Link to={`/dashboard/edit-articles/${article._id}`}>
                    <button className=" text-gray-100 rounded-lg hover:text-blue-700 bg-blue-500 px-3 py-2 glass">
                      <FaEdit className="inline-block mr-2" />
                      Edit
                    </button>
                  </Link>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="text-gray-100 hover:text-red-700 bg-red-500 px-3 py-2 glass rounded-lg"
                  >
                    <FaTrash className="inline-block mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No articles found</p>
        )}
      </div>
    </div>
  );
};

export default SubmittedArticles;
