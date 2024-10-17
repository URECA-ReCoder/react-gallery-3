import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import useModal from './useModal';
import { css } from '@emotion/react';

export default function SelectedMissionModal({ isOpen, setIsOpen, post }) {
  const confirmModal = useModal();
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    confirmModal.openModal();
  };
  const handleCancelClick = () => {
    confirmModal.closeModal();
    setIsOpen(false);
    navigate('');
  };

  return (
    <>
      <ReactModal
        css={modalWrap}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <div css={modalBackGround} onClick={handleCancelClick} />
        <div css={modalContainer}>
          <h2>{post.type}</h2>
          <p>{post.creator}</p>
          <a href={post.url}>{post.url}</a>
          <div></div>
          <button onClick={handleCancelClick}>모달 닫기</button>
        </div>
      </ReactModal>
    </>
  );
}
const modalWrap = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const modalContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  gap: 2rem;
  padding: 3.6rem;
  border: 1px solid white;
  background-color: white;
  position: absolute;
  z-index: 10;
  left: 6rem;
  top: 16rem;
  width: 80%;
  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  p {
    font-size: 18px;
    color: #555;
  }

  a {
    color: #007bff;
    text-decoration: none;
    font-size: 16px;
  }
`;
const modalBackGround = css`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  position: absolute;
  bottom: 0;
  left: 0;
`;
