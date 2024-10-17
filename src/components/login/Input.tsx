/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface InputProps {
  id: string;
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ id, label, type, name, value, onChange }) => {
  return (
    <div css={inputWrapperStyle}>
      <label htmlFor={id} css={labelStyle}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        css={inputStyle}
        required
      />
    </div>
  );
};

const inputWrapperStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px; 
`;

const labelStyle = css`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px; 
`;

const inputStyle = css`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export default Input;
