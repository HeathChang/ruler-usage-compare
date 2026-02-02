import { useState } from 'react';
import { LoginForm } from '../ui/LoginForm.ui';
import { useLogin } from '../hooks/useLogin';
import { validateLoginForm } from '../../../shared/lib/validation';

export const LoginFormContainer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );

  const { login, isLoading, error: submitError } = useLogin();

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(undefined);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(undefined);
  };

  const handleSubmit = async () => {
    const validation = validateLoginForm(email, password);

    if (!validation.isValid) {
      setEmailError(validation.errorMessage);
      setPasswordError(validation.errorMessage);
      return;
    }

    try {
      await login({ email, password });
      // 로그인 성공 시 리다이렉트 등 처리
      window.location.href = '/';
    } catch {
      // 에러는 useLogin에서 처리됨
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      emailError={emailError}
      passwordError={passwordError}
      submitError={submitError}
    />
  );
};
