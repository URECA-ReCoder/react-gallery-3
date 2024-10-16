import { css } from '@emotion/react';
import LikeFill from '/assets/images/like-fill.svg';
import Like from '/assets/images/like.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  type: string;
  creator: string;
  liked: boolean;
}

export default function MainContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<'all' | 'liked'>('all');

  const toggleLiked = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://vicarious-arlyn-recoder-cb1ffac8.koyeb.app/missions',
        {
          headers: { accept: 'application/json' },
        }
      );
      console.log('response =>', response.data);
      setPosts(response.data);
    };
    fetchData();
  }, []);

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
            <h2>{post.type}</h2>
            <span>{post.creator}</span>
            <button onClick={() => toggleLiked(post.id)}>
              {post.liked ? (
                <img src={Like} css={buttonStyle} />
              ) : (
                <img src={LikeFill} css={buttonStyle} />
              )}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
const buttonStyle = css`
  width: 30px;
  height: 30px;
`;
const filterContainer = css`
  display: flex;
  gap: 5px;
  margin: 0 0 20px 0;
  button {
    margin: 0 10px 0;
  }
`;
const mainContainer = css`
  width: 100%;
  margin-top: 80px;
  padding: 20px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const contentContainer = css`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: repeat(3, 1fr);
  gap: 15px;
`;
const contentWrapper = css`
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;
