interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  message?: string
  token?: string
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password } as LoginRequest),
    })

    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
