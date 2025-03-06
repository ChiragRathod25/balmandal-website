import React, { useCallback } from 'react';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { QueryHandler } from '../../components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UserPosts() {
  const userId = useSelector((state) => state.auth.userData._id);
  const fetchUserPosts = useCallback(() => databaseService.getPostsByUserId({ userId }), [userId]);
  const { data: posts, loading, error } = useCustomReactQuery(fetchUserPosts);

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div>UserPosts</div>
      {posts?.map((post) => (
        <div
          key={post._id}
          className="
          border
          border-gray-400
          p-2
          rounded-md
          my-2"
        >
          <div>{post.title}</div>
          <div>{post.status}</div>
          <div>Created At: {post.createdAt}</div>
        </div>
      ))}
    </QueryHandler>
  );
}

export default UserPosts;
