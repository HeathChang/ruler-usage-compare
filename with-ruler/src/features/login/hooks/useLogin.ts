import { useState } from 'react';
import { loginApi } from '../api/loginApi';
import type { LoginRequest, LoginResponse } from '../../../entities/user/types';

interface UseLoginReturn {
  login: (request: LoginRequest) => Promise<void>;
  isLoading: boolean;
  error: string | undefined;
}

export const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const login = async (request: LoginRequest): Promise<void> => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response: LoginResponse = await loginApi(request);
      // 로그인 성공 처리 (토큰 저장 등)
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '로그인에 실패했습니다.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};
