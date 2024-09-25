import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AllUsers = () => {
  // Fetch all users using react-query with the Object form
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3001/users"); // Update the URL if necessary
      return data;
    }
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border text-center">{index + 1}</td>
              <td className="py-2 px-4 border">{user.name || "N/A"}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.role || "user"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
