import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import LikeFill from '/assets/images/like-fill.svg';
import Like from '/assets/images/like.svg';
import axios from 'axios';

interface LikeButtonProps {
  missionId: string;
  initialLiked: boolean;
  initialLikeCount: number;
  isLoggedIn: boolean;
}

export default function LikeButton({
  missionId,
  initialLiked,
  initialLikeCount,
  isLoggedIn,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iuq5gOycpOydvCIsInN1YiI6IjM1NWI3YWUxLWM1MmEtNDg2Yi04NThiLTIwMjkwM2Q5OWJhOSIsImlhdCI6MTcyOTE1NjY4NCwiZXhwIjoxNzI5MTYwMjg0fQ.no-bQYrPwMhM-AThZDx8MwLI7i9m4U7tBztWFK5p9Xw';
  const handleLikeClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    missionId: string
  ) => {
    e.stopPropagation(); // 이벤트 전파 방지
    // if (!isLoggedIn) {
    //   alert('로그인이 필요한 기능입니다.');
    //   return;
    // }
    try {
      // 좋아요 API 호출
      const response = await axios.post(
        `http://localhost:8080/mission/${missionId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }
      );
      console.log('좋아요', liked);
      // API 호출 성공 시 상태 업데이트
      if (response.status === 201) {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert('인증되지 않은 사용자입니다. 로그인이 필요합니다.');
      } else {
        console.error('좋아요 상태 변경 실패:', error);
      }
    }
  };

  // 좋아요 갯수 기능
  useEffect(() => {
    const fetchLikeCount = async (token: string) => {
      const response = await axios.post(
        `http://localhost:8080/mission/${missionId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLikeCount(response.data.likeCount);
    };
    fetchLikeCount(token);
  }, []);
  return (
    <div css={likeContainer}>
      <button onClick={(e) => handleLikeClick(e, missionId)}>
        {liked ? (
          <img src={Like} css={likeButtonStyle} />
        ) : (
          <img src={LikeFill} css={likeButtonStyle} />
        )}
      </button>
      <div css={likeCountWrapper}>{likeCount}</div>
    </div>
  );
}
const likeCountWrapper = css`
  border: 1px solid red;
`;
const likeButtonStyle = css`
  width: 20px;
  height: 20px;
`;
const likeContainer = css`
  display: flex;
  flex-direction: row;
`;
