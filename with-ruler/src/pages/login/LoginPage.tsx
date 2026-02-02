import styled from 'styled-components';
import { LoginFormContainer } from '../../features/login';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const LoginPage = () => {
  return (
    <PageContainer>
      <LoginFormContainer />
    </PageContainer>
  );
};
