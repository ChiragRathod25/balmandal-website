import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, CommentContainer } from '../index';
import databaseService from '../../services/database.services';
import { useParams } from 'react-router-dom';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
function PostInteractions() {
  const [isCommentContainerVisible, setIsCommentContainerVisible] = useState(false);
  const handleLikeClick = async () => {
    await databaseService.togglePostLike(postId);
  };
  const {postId}=useParams();
  const fetchPostLikes = useCallback(()=>databaseService.getLikesByPostId(postId),[postId]);
  const {data:likes,loading,error}=useCustomReactQuery(fetchPostLikes);
  
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <Button onClick={() => handleLikeClick()} variant="text" color="primary">
            Like 
          </Button>
          {likes?.length}
        </div>
        <div onClick={() => setIsCommentContainerVisible(!isCommentContainerVisible)}>Comment</div>
        <div>Share</div>
      </div>
      {isCommentContainerVisible && <CommentContainer />}
    </>
  );
}

export default PostInteractions;
