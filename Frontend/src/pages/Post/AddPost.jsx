import React from "react";
import { PostForm } from "../../components";

function AddPost() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Create a New Post</h1>

      {/* Post Form Component */}
      <PostForm />
    </div>
  );
}

export default AddPost;
