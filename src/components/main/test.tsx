import { css } from '@emotion/react';
import axios from 'axios';
import { useState } from 'react';

export default function MainContent() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'post-1', liked: false, isLogin: true },
    { id: 2, title: 'post-2', liked: false, isLogin: true },
    { id: 3, title: 'post-3', liked: false, isLogin: true },
  ]);
  const [filter, setFilter] = useState('all');
  const toggleLiked = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const [hongs, setHongs] = useState([]);

  const testAPICall = async () => {
    console.log('=== testAPICall ===');
    let a = await axios.get(
      'https://vicarious-arlyn-recoder-cb1ffac8.koyeb.app/missions',
      {
        headers: { accept: 'application/json' },
      }
    );
    console.log('a => ', a.data);
    setHongs(a.data);
  };

  const filteredPosts =
    filter === 'liked' ? posts.filter((post) => post.liked) : posts;
  return (
    <main css={mainContainer}>
      <div css={filterContainer}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('liked')}>Liked</button>
      </div>
      <div css={contentContainer}>
        {filteredPosts.map((post) => (
          <div key={post.id} css={contentWrapper}>
            <h2>{post.title}</h2>
            <button onClick={() => toggleLiked(post.id)}>
              {post.liked ? 'Unlike' : 'Like'}
            </button>
          </div>
        ))}
        <button onClick={testAPICall}> 버튼 </button>
      </div>
      <div css={contentContainer}>
        {hongs.map((hong) => (
          <div key={hong.id} css={contentWrapper}>
            <h2>{hong.type}</h2>
            <span>{hong.creator}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
const filterContainer = css`
  display: flex;
  gap: 5px;
  margin: 0 0 20px 0;
  button {
    margin: 0 10px 0;
  }
`;
const mainContainer = css`
  flex-grow: 1;
  margin-top: 80px;
  padding: 20px;
  border: 1px solid gray;
`;
const contentContainer = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border: 1px solid red;
`;
const contentWrapper = css`
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;
