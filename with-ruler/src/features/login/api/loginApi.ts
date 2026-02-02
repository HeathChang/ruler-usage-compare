import type { LoginRequest, LoginResponse } from '../../../entities/user/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

export const loginApi = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { message?: string };
    throw new Error(errorData.message || '로그인에 실패했습니다.');
  }

  const data = (await response.json()) as LoginResponse;
  return data;
};
