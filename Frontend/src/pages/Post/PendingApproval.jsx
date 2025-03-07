import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { PostCard } from '../../components';
import { useNavigate } from 'react-router-dom';

function PendingApproval() {
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  const fetchPendingApproval = useCallback(() => databaseService.getPendingPosts(), []);
  const { loading, error, data: posts } = useCustomReactQuery(fetchPendingApproval);
const navigate=useNavigate()
  return isAdmin ? (
    <>
      <div>PendingApproval</div>
      {
        posts ? (
          posts.map((post) => (
              <div key={post._id}
              onClick={()=>navigate('/post/'+post._id)}
              >

              <PostCard post={post} />
              </div>
          ))
        ) : null
      }
    </>
  ) : null;
}

export default PendingApproval;
