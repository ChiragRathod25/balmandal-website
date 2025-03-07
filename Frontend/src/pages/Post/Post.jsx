import React, { useCallback } from 'react';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { QueryHandler, Button } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import Parse from 'html-react-parser';
import { useSelector } from 'react-redux';
function Post() {
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  const { postId } = useParams();
  const fetchPost = useCallback(() => databaseService.getPostById({ postId }), [postId]);
  const { loading, error, data: post } = useCustomReactQuery(fetchPost);
  const navigate = useNavigate();
  const handleApprove = async (postId) => {
    try {
      const response = await databaseService
        .toggleIsApproved({ postId })
        .then((response) => response.data);
      if (response?.data.isApproved === true) {
        console.log('Approval status changed successfully !!');
        navigate(`/post/${postId}`);
      } else {
        console.log('Something went wrong while updating post approval status');
      }
    } catch (error) {
      console.log('Error while updating post status', error);
    }
  };
  return post ? (
    <QueryHandler queries={[{ loading, error }]}>
      <div>Post</div>
      <div>{post?.title}</div>
      <div>{Parse(post?.content)}</div>
      <div>{post?.isCommentEnable}</div>
      <div>{post?.tags}</div>
      <div>{post?.status}</div>
      <div>{post?.slug}</div>
      <div>Created At: {post?.createdAt}</div>
      <div>Created By : {post?.createdBy}</div>
      <Button onClick={() => navigate('/post/edit/' + postId)}>Edit</Button>
      {isAdmin && !post?.isApproved ? (
        <Button onClick={() => handleApprove(post?._id)}>Approve</Button>
      ) : null}
    </QueryHandler>
  ) : null;
}

export default Post;
