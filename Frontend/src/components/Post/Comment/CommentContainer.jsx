import React, { useCallback } from 'react';
import { CommentCard, CommentForm } from '../../index';
import databaseService from '../../../services/database.services';
import useCustomReactQuery from '../../../utils/useCustomReactQuery';
import { useParams } from 'react-router-dom';
function CommentContainer() {
  const {postId}=useParams();
 
  const fetchPostCommnets = useCallback(() => databaseService.getCommentsByPostId({ postId }), [postId]);
  const { loading, error, data: comments } = useCustomReactQuery(fetchPostCommnets);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500 text-center text-lg font-semibold">{error}</div>;
  }

  return comments ? (
    <>
      
      <CommentForm />
      {comments &&
        Array.isArray(comments) &&
        comments.map((comment) => {
          return <CommentCard key={comment._id} comment={comment} />;
        })}
    </>
  ) : (
    <div>No comments found</div>
  );
}

export default CommentContainer;
