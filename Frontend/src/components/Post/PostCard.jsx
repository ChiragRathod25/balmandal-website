import React from 'react';

function PostCard({ post }) {
  return post ? (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {post.featuredImage && (
          <img
            className="w-full h-56 object-cover object-center"
            src={post.featuredImage}
            alt="blog"
          />
        )}
        <div className="p-4">
          <h2 className="font-semibold text-lg">{post.title}</h2>
          <div className="flex justify-between items-center mt-4">
            <a href={`/post/${post._id}`} className="text-blue-600 hover:underline">
              Read more
            </a>
            <p className="text-gray-400">{post.createdAt}</p>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default PostCard;
