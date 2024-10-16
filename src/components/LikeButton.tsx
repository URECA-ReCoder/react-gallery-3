import { css } from '@emotion/react';
import { useState } from 'react';
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

  const handleLikeClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    missionId: string
  ) => {
    e.stopPropagation(); // 이벤트 전파 방지
    if (!isLoggedIn) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error(' 토큰이 없습니다.');
      }
      // 좋아요 API 호출
      const response = await axios.post(
        `https://stupid-kellie-recoder-fdfcec71.koyeb.app/mission/${missionId}/like`,
        {
          message: '좋아요 추가',
        },
        {
          headers: {
            accept: 'application/json',
          },
        }
      );
      // API 호출 성공 시 상태 업데이트
      if (response.status === 200) {
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
  return (
    <div>
      <button onClick={() => handleLikeClick}>
        {liked ? (
          <img src={Like} css={likeButtonStyle} />
        ) : (
          <img src={LikeFill} css={likeButtonStyle} />
        )}
      </button>
    </div>
  );
}
const likeButtonStyle = css`
  width: 20px;
  height: 20px;
`;
