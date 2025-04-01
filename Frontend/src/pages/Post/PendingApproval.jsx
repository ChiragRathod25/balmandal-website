import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import databaseService from "../../services/database.services";
import useCustomReactQuery from "../../utils/useCustomReactQuery";
import { PostCard } from "../../components";

function PendingApproval() {
  const isAdmin = useSelector((state) => state.auth.userData?.isAdmin);
  const navigate = useNavigate();

  // Fetch posts awaiting approval
  const fetchPendingApproval = useCallback(() => databaseService.getPendingPosts(), []);
  const { loading, error, data: posts } = useCustomReactQuery(fetchPendingApproval);

  // If not admin, restrict access
  if (!isAdmin) return <p className="text-center text-red-500 font-semibold">Access Denied</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Pending Approvals</h1>

      {/* Loading & Error Handling */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {/* List of Pending Posts */}
      <div className="space-y-4">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              onClick={() => navigate(`/post/${post._id}`)}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            >
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No pending posts found.</p>
        )}
      </div>
    </div>
  );
}

export default PendingApproval;
