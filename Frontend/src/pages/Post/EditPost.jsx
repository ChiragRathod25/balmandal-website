import React, { useCallback } from 'react';
import databaseService from '../../services/database.services';
import { PostForm, QueryHandler } from '../../components';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { useParams } from 'react-router-dom';

function EditPost() {
  const { postId } = useParams();
  const fetchPost = useCallback(() => databaseService.getPostById({ postId }), [postId]);
  const { loading, error, data: post } = useCustomReactQuery(fetchPost);
  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div>EditPost</div>
      <PostForm post={post} />
    </QueryHandler>
  );
}

export default EditPost;
