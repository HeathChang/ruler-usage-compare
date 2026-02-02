import styled from 'styled-components';

interface InputProps {
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  errorMessage?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const StyledInput = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ hasError }) => (hasError ? '#e74c3c' : '#ddd')};
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? '#e74c3c' : '#3498db')};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #e74c3c;
`;

export const Input = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  errorMessage,
  disabled = false,
  'aria-label': ariaLabel,
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <InputWrapper>
      <Label htmlFor={ariaLabel || label}>{label}</Label>
      <StyledInput
        id={ariaLabel || label}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        hasError={!!errorMessage}
        aria-label={ariaLabel || label}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${ariaLabel || label}-error` : undefined}
      />
      {errorMessage && (
        <ErrorMessage id={`${ariaLabel || label}-error`} role="alert">
          {errorMessage}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};
