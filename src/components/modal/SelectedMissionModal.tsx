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
          <div>{post.type}</div>
          <div>{post.creator}</div>
          <div>{post.url}</div>
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
`;
const modalContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  gap: 2rem;
  padding: 3.6rem;
  border: 1px solid white;
  background-color: white;
  position: absolute;
  left: 6rem;
  top: 16rem;
  width: 80%;
`;
const modalBackGround = css`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  position: absolute;
  bottom: 0;
  left: 0;
`;
