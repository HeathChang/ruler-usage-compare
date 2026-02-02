export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export const validateLoginForm = (
  email: string,
  password: string
): ValidationResult => {
  if (!email.trim()) {
    return {
      isValid: false,
      errorMessage: '이메일을 입력해주세요.',
    };
  }

  if (!validateEmail(email)) {
    return {
      isValid: false,
      errorMessage: '올바른 이메일 형식이 아닙니다.',
    };
  }

  if (!password) {
    return {
      isValid: false,
      errorMessage: '비밀번호를 입력해주세요.',
    };
  }

  if (!validatePassword(password)) {
    return {
      isValid: false,
      errorMessage: '비밀번호는 6자 이상이어야 합니다.',
    };
  }

  return {
    isValid: true,
  };
};
