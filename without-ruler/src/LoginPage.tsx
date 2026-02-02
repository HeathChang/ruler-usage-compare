import { useState } from 'react'
import { login } from './api'
import './LoginPage.css'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    return password.length >= 6
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setErrors({})

    // 유효성 검사
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!validateEmail(email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.'
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.'
    } else if (!validatePassword(password)) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // API 호출
    setIsLoading(true)
    try {
      const response = await login(email, password)
      if (response.success) {
        setMessage('로그인 성공!')
        // 실제로는 토큰을 저장하고 다른 페이지로 이동
        console.log('Token:', response.token)
      } else {
        setMessage(response.message || '로그인에 실패했습니다.')
      }
    } catch (error) {
      setMessage('로그인 중 오류가 발생했습니다.')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>로그인</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              disabled={isLoading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {message && (
            <div className={`message ${message.includes('성공') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
