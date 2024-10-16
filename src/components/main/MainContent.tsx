import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SelectedMissionModal from '../modal/SelectedMissionModal';
import LikeButton from '../LikeButton';

interface Post {
  id: string;
  type: string;
  creator: string;
  liked: boolean;
  likeCount: number;
}

export default function MainContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'liked'>('all');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 좋아요 상태 변경

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); //토큰이 있다면 로그인 상태로 설정
  }, []);

  // 좋아요 상태 변경 및 좋아요 개수 업데이트
  const toggleLiked = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
            }
          : post
      )
    );
  };

  // 좋아요 누른 항목만 필터링
  const filteredPosts =
    filter === 'liked' ? posts.filter((post) => post.liked) : posts;
  console.log(selectedPost);

  // 미션 목록 가져오기 API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'https://stupid-kellie-recoder-fdfcec71.koyeb.app/missions',
          {
            headers: { accept: 'application/json' },
          }
        );
        setPosts(response.data);
      } catch (err) {
        setError('미션 목록을 가져오는 중 오류가 발생했습니다.');
        console.error('목록 오류 발생:', err);
      }
    };
    fetchPosts();
  }, []);

  // 미션 클릭 시 호출되는 함수
  const handlePostClick = async (missionId: string) => {
    try {
      const response = await axios.get<Post>(
        `https://stupid-kellie-recoder-fdfcec71.koyeb.app/mission/${missionId}`,
        {
          headers: { accept: 'application/json' },
        }
      );
      setSelectedPost(response.data);
      setIsOpen(true);
      console.log('response.Data=>', response.data);
    } catch (err) {
      setError('미션 정보를 가져오는 중 오류가 발생했습니다.');
      console.error('정보 오류 발생', err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <main css={mainContainer}>
      <div css={filterContainer}>
        <button css={filterButtonStyle} onClick={() => setFilter('all')}>
          All
        </button>
        <button css={filterButtonStyle} onClick={() => setFilter('liked')}>
          Liked
        </button>
      </div>
      {/* 필터링 항목 영역 */}
      <div>
        <ul>
          <li>
            <button css={filterButtonStyle}>VANILLA_TODO</button>
          </li>
          <li>
            <button css={filterButtonStyle}>REACT_TODO</button>
          </li>
          <li>
            <button css={filterButtonStyle}>REACT_SNS</button>
          </li>
        </ul>
      </div>
      {/* 갤러리 영역 */}
      <div css={contentContainer}>
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            css={contentWrapper}
            onClick={() => handlePostClick(post.id)}
          >
            <h2>{post.type}</h2>
            <div css={footerContainer}>
              <span>{post.creator}</span>
              <LikeButton
                missionId={post.id}
                initialLiked={post.liked}
                initialLikeCount={post.likeCount}
                isLoggedIn={isLoggedIn} // 로그인 여부
              />
            </div>
          </div>
        ))}
      </div>

      {/* 모달 영역 */}
      {selectedPost && (
        <SelectedMissionModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          post={selectedPost}
        />
      )}
    </main>
  );
}

const footerContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  align-self: flex-end;
`;

const filterButtonStyle = css`
  border: 1px solid gray;
  padding: 10px;
  border-radius: 5px;
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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const contentContainer = css`
  /* grid 보단 flex로 하는게 더 유연하다. */
  /* display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: repeat(3, 1fr); */
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
`;
const contentWrapper = css`
  width: 135px;
  height: 80px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
