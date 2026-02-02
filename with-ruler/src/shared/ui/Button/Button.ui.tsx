import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit';
  'aria-label'?: string;
}

const StyledButton = styled.button<{ isLoading: boolean }>`
  width: 100%;
  padding: 12px 24px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${({ isLoading, disabled }) =>
    isLoading || disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ isLoading, disabled }) =>
    isLoading || disabled ? 0.6 : 1};
  transition: background-color 0.2s, opacity 0.2s;

  &:hover:not(:disabled) {
    background-color: #2980b9;
  }

  &:active:not(:disabled) {
    background-color: #21618c;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Button = ({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      aria-label={ariaLabel}
      aria-busy={isLoading}
    >
      {isLoading ? '처리 중...' : children}
    </StyledButton>
  );
};
