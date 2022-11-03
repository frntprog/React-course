import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService.js';
import { useFetching } from '../components/hooks/useFetching.js';
import Loader from '../components/Loader/Loader.jsx';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id)
  }, []);

  return (
    <div>
      <h1>Post page with id = {params.id}</h1>
      {isLoading
        ? <Loader></Loader>
        : <div>{post.id} {post.title}</div>
      }
      <h1>Comments</h1>
      {isComLoading
        ? <Loader></Loader>
        : <div>
          {comments.map(comm =>
            <div style={{ marginTop: 15 }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>)}
        </div>
      }
    </div>
  );
};

export default PostIdPage;