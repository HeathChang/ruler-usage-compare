import styled from 'styled-components';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  emailError?: string;
  passwordError?: string;
  submitError?: string;
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  padding: 32px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  text-align: center;
`;

const ErrorMessage = styled.div`
  padding: 12px;
  background-color: #fee;
  border: 1px solid #e74c3c;
  border-radius: 4px;
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
`;

export const LoginForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isLoading,
  emailError,
  passwordError,
  submitError,
}: LoginFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <FormContainer onSubmit={handleSubmit} noValidate>
      <Title>로그인</Title>
      {submitError && (
        <ErrorMessage role="alert" aria-live="polite">
          {submitError}
        </ErrorMessage>
      )}
      <Input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="이메일을 입력하세요"
        label="이메일"
        errorMessage={emailError}
        disabled={isLoading}
        aria-label="이메일 입력"
      />
      <Input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="비밀번호를 입력하세요"
        label="비밀번호"
        errorMessage={passwordError}
        disabled={isLoading}
        aria-label="비밀번호 입력"
      />
      <Button
        type="submit"
        onClick={onSubmit}
        isLoading={isLoading}
        disabled={isLoading}
        aria-label="로그인 버튼"
      >
        로그인
      </Button>
    </FormContainer>
  );
};
