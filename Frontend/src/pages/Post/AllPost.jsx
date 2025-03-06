import React, { useCallback } from 'react';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { Button, PostCard } from '../../components';
import {Link} from 'react-router-dom';

function AllPost() {
  const fetchAllPosts = useCallback(() => databaseService.getPosts(), []);
  const { loading, error, data: posts } = useCustomReactQuery(fetchAllPosts);

  return posts ? (
    <>
      <div>
        <p>
        AllPost
        </p>
       
       <Button>
        <Link to="/post/add">
          Craete Post
        </Link>
       </Button>
       <Button>
        <Link to="/post/user">
          My Posts
        </Link>
       </Button>

      </div>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </>
  ) : null;
}

export default AllPost;
