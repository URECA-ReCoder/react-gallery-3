/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface SignUpButtonProps {
  onClick: () => void; 
}

const buttonStyle = css`
  background-color: #5BC9C9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #719fd1;
  }
`;

export default function SignUpButton({ onClick }: SignUpButtonProps) {
  return (
    <button css={buttonStyle} onClick={onClick}>
      회원가입
    </button>
  );
}
