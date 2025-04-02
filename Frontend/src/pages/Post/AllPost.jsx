import  { useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../../services/database.services";
import useCustomReactQuery from "../../utils/useCustomReactQuery";
import { Button, PostCard } from "../../components";

function AllPost() {
  const fetchAllPosts = useCallback(() => databaseService.getPosts(), []);
  const { loading, error, data: posts } = useCustomReactQuery(fetchAllPosts);
  const isAdmin = useSelector((state) => state.auth.userData?.isAdmin);

  if (loading) {
    return <p className="text-center text-lg font-semibold mt-5">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg font-semibold mt-5">Error: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">All Posts</h1>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <Link to="/post/add">
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Create Post</Button>
        </Link>

        <Link to="/post/user">
          <Button className="bg-gray-600 text-white px-4 py-2 rounded-lg">My Posts</Button>
        </Link>

        {isAdmin && (
          <Link to="/post/pending">
            <Button className="bg-yellow-600 text-white px-4 py-2 rounded-lg">Pending Approval</Button>
          </Link>
        )}
      </div>

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
    </div>
  );
}

export default AllPost;
