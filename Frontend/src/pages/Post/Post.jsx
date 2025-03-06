import React, { useCallback } from 'react';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { QueryHandler,Button } from '../../components';
import { useNavigate,useParams } from 'react-router-dom';
import Parse from 'html-react-parser';
function Post() {
  const { postId } = useParams();
  const fetchPost = useCallback(() => databaseService.getPostById({ postId }), [postId]);
  const { loading, error, data: post } = useCustomReactQuery(fetchPost);
  const navigate = useNavigate();
  
  return post ?(
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
      <Button onClick={()=>navigate('/post/edit/'+postId)}>Edit</Button>
      
    </QueryHandler>
  ):null;
}

export default Post;
