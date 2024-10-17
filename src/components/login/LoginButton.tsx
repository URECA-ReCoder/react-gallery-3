/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface LoginButtonProps {
  onClick: () => void;
}

const buttonStyle = css`
  background-color: #5BC9C9;;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #5BC9C9;
  }
`;

export default function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <button css={buttonStyle} onClick={onClick}>
      로그인
    </button>
  );
}
