import { useState } from 'react';
import { useAuth } from '../contexts/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { isMobile, isDesktop } from '../utils/Helper';

const Container = styled.section`
  margin: ${isDesktop() ? '10px 10%' : ''};
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-direction: ${isMobile() ? 'column' : ''};
`;

const Left = styled.div``;

const Title = styled.h1`
  margin-top: 30px;
`;

const Subtitle = styled.p`
  margin-top: 30px;
  font-size: ${isMobile() ? '14px' : '16px'};
`;

const Right = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  width: ${isMobile() ? '100%' : '300px'};
  outline: none;
  margin-top: 30px;
  font-size: 16px;
  &::placeholder, &:focus{
    position: relative;
    top: 0;
  }
`;

const Button = styled.button`
  background-color: rgb(217,0,76);
  color: white;
  margin-top: 30px;
  padding: 10px;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  &:hover {
      background-color: rgb(190,0,50);
      transition: .5s;
  }
`;

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || '/';

  const handleLogin = () => {
    auth.login(email, password);
    navigate(redirectPath, {replace: true});
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Login</Title>
          <Subtitle>Get Access to your Orders, Wishlist and Recommendations</Subtitle>
        </Left>
        <Right>
          <Form onSubmit={handleLogin}>
            <Input type='email' placeholder='Email' name='email' htmlFor='email'required onChange={e => setEmail(e.target.value)} />
            <Input type='password' placeholder='Password' name='password' htmlFor='password' required onChange={e => setPassword(e.target.value) }/>
            <Button>Login</Button>
          </Form>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Signin;