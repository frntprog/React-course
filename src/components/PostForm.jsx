import React, { useState } from 'react';
import MyButton from './UI/button/MyButton.jsx';
import MyInput from './UI/input/MyInput.jsx';

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: '', body: '' });
  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post, id: Date.now(),
    }
    create(newPost);
    setPost({ title: '', body: '' });
  }

  return (
    <form>
      <MyInput onChange={e => setPost({ ...post, title: e.target.value })} value={post.title} type="text" placeholder='Post title' />
      <MyInput onChange={e => setPost({ ...post, body: e.target.value })} value={post.body} type="text" placeholder='Post description' />
      <MyButton onClick={addNewPost}>Create Post</MyButton>
    </form>
  );
};

export default PostForm;