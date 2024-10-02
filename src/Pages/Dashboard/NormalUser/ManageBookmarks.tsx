import React, { useEffect, useState } from 'react';

interface Bookmark {
  id: string;
  title: string;
  link: string;
}

const ManageBookmarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    // Fetch bookmarks from backend or use dummy data
    const fetchBookmarks = async () => {
      const bookmarkData: Bookmark[] = [
        { id: '1', title: 'TypeScript Docs', link: 'https://www.typescriptlang.org/docs/' },
        { id: '2', title: 'React Documentation', link: 'https://reactjs.org/docs/getting-started.html' },
      ];
      setBookmarks(bookmarkData);
    };

    fetchBookmarks();
  }, []);

  const deleteBookmark = (id: string) => {
    // Remove bookmark logic
    setBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Bookmarks</h1>
      {bookmarks.length > 0 ? (
        <ul className="space-y-4">
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.id}
              className="border p-4 rounded-lg shadow-md bg-white flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{bookmark.title}</h2>
                <a
                  href={bookmark.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {bookmark.link}
                </a>
              </div>
              <button
                onClick={() => deleteBookmark(bookmark.id)}
                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No bookmarks yet.</p>
      )}
    </div>
  );
};

export default ManageBookmarks;
