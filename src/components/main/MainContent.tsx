import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SelectedMissionModal from '../modal/SelectedMissionModal';
import LikeButton from '../LikeButton';

interface Post {
  id: string;
  type: number;
  creator: string;
  likes: {
    id: string;
    missionId: string;
    userId: string;
    username: string;
    creatAt: string;
  }[];
}

export default function MainContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<
    'all' | 'like' | 'VANILLA_TODO' | 'REACT_TODO' | 'REACT_SNS'
  >('all');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 좋아요 상태 변경

  // 필터링 된 항목들
  const filteredPosts =
    filter === 'like' ? posts.filter((post) => post.likes) : posts;
  console.log(selectedPost);

  // 미션 목록 가져오기 API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/missions', {
          headers: { accept: 'application/json' },
        });
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
        `http://localhost:8080/mission/${missionId}`,
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

  // 카테고리 별 필터링
  const handleFilteredPostClick = async (type: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/missions?type=${type}`,
        {
          headers: { accept: 'application/json' },
        }
      );
      setFilter(response.data);
    } catch (err) {
      console.error('필터링 정보 오류 발생', err);
      setError('카테코리 별 필터링 정보를 가져오는 중 오류가 발생했습니다.');
    }
  };
  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8080/profile', {
        headers: { accept: 'application/json' },
      });
      setIsLoggedIn(response.data);
    } catch (err) {
      console.error('현재 로그인한 사용자 정보 오류 발생', err);
      setError('현재 로그인한 사용자 정보를 가져오는 중 오류가 발생했습니다.');
    }
  };
  console.log('fetchProfile', fetchProfile);
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <main css={mainContainer}>
      <div css={filterContainer}>
        {/* 필터링 항목 영역 */}
        <div>
          <h2 css={h2Wrapper}>카테고리별로 작품들을 나눠서 보세요!</h2>
        </div>
        <div css={filterComponentView}>
          <ul css={listContainer}>
            <li>
              <button css={filterButtonStyle} onClick={() => setFilter('all')}>
                <span css={fontStyle}>All</span>
              </button>
            </li>
            <li>
              <button css={filterButtonStyle} onClick={() => setFilter('like')}>
                <span css={fontStyle}>Like</span>
              </button>
            </li>
            <li>
              <button
                css={filterButtonStyle}
                onClick={() => handleFilteredPostClick(1)}
              >
                <span css={fontStyle}>VANILLA_TODO</span>
              </button>
            </li>
            <li>
              <button
                css={filterButtonStyle}
                onClick={() => handleFilteredPostClick(2)}
              >
                <span css={fontStyle}>REACT_TODO</span>
              </button>
            </li>
            <li>
              <button
                css={filterButtonStyle}
                onClick={() => handleFilteredPostClick(3)}
              >
                <span css={fontStyle}>REACT_SNS</span>
              </button>
            </li>
          </ul>
        </div>
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
                // initialLiked={post.likes()}
                initialLikeCount={post.likes.length}
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
const fontStyle = css`
  color: #212121;
  display: block;
  font-size: 16px;
  font-weight: 700;
  line-height: 64px;
  margin-left: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const listContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 12px;
`;
const filterComponentView = css`
  margin-top: 30px;
`;
const h2Wrapper = css`
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
`;
const footerContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  align-self: flex-end;
`;

const filterButtonStyle = css`
  background: #fff;
  padding: 10px 15px;
  border-radius: 100px;
  box-shadow: 0 1px 0 0 #00000005;
  display: flex;
  height: 92px;
  max-width: 270px;
  padding: 14px 40px 0 14px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #eee;
    color: #000;
  }
`;
const filterContainer = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  button {
    margin: 0 10px 0;
  }
  @media (min-width: 996px) {
    width: 652px;
  }
  margin: 0 auto;
`;
const mainContainer = css`
  width: 100%;
  margin-top: 80px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  background: #f7f7fa;
`;
const contentContainer = css`
  /* grid 보단 flex로 하는게 더 유연하다. */
  /* display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: repeat(3, 1fr); */
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 996px) {
    width: 652px;
  }
  @media (min-width: 965px) {
    width: 430px;
  }
  @media (min-width: 1188px) {
    width: 874px;
  }
  margin: 0 auto;
`;
const contentWrapper = css`
  width: 135px;
  height: 208px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 14px;
  box-shadow: 0 1px 0 #00000005;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    h2 {
      font-size: 16px;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }

    span {
      font-size: 14px;
      color: #666;
    }
  }
`;
