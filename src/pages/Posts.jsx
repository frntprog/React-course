

import React, { useEffect, useState, useRef } from 'react';
import { useFetching } from '../components/hooks/useFetching.js';
import { usePosts } from '../components/hooks/usePost.js';
import Loader from '../components/Loader/Loader.jsx';
import PostFilter from '../components/PostFilter.jsx';
import PostForm from '../components/PostForm.jsx';
import PostList from '../components/PostList';
import PostService from '../API/PostService.js';
import MyButton from '../components/UI/button/MyButton.jsx';
import MyModal from '../components/UI/MyModal/MyModal.jsx';
import { getPageCount } from '../utils/pages.js';
import '../styles/App.css';
import Pagination from '../components/UI/pagination/Pagination.jsx';
import { useObserver } from '../components/hooks/useObserver.js';
import MySelect from '../components/UI/select/MySelect.jsx';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalpages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSeatchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalpages(getPageCount(totalCount, limit));
  })

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
        Create user
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Number of elements on the page"
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Show all' },
        ]}
      ></MySelect>
      {
        postError &&
        <h1>Error ${postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSeatchedPosts} title="Post about JS" />
      <div ref={lastElement} style={{ height: 20, background: 'red' }}></div>
      {isPostLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} ><Loader /></div>}
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      ></Pagination>
    </div>
  );
}

export default Posts;

