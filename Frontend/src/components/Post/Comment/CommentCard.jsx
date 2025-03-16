import React from 'react';
import { useSelector } from 'react-redux';

function CommentCard({ comment }) {
  const authUser = useSelector((state) => state.auth.userData); // Get logged-in user

  const isUserComment = comment.createdBy === authUser._id;

  return (
    <div className={`flex ${isUserComment ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-3 rounded-lg shadow-md max-w-xs md:max-w-md ${
          isUserComment ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        <p className="text-sm font-semibold">{comment.username}</p>
        <p className="text-base">{comment.content}</p>
        <p className="text-xs opacity-70 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default CommentCard;
