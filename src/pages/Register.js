import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const Container = styled.main`
  margin: 10px 20%;
  display: flex;
`;

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const Left = styled.div``;

const Title = styled.h1`
  margin-top: 30px;
`;

const Subtitle = styled.p`
  margin-top: 30px;

`;

const Right = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  width: 300px;
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

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = useCallback(() => {
      navigate(`/`, {replace: true});
      window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>SignUp</Title>
          <Subtitle>We do not share your personal details</Subtitle>
        </Left>
        <Right>
          <Form onSubmit={handleRegister}>
            <Input type='text' placeholder='First Name' name='firstname' htmlFor='firstname' required />
            <Input type='text' placeholder='Last Name' name='lastname' htmlFor='lastname' required/>
            <Input type='email' placeholder='Email' name='email' htmlFor='email'required />
            <Input type='password' placeholder='Password' name='password' htmlFor='password' required />
            <Input type='password' placeholder='Confirm Password' name='confirm-password' htmlFor='confirm-password' required />
            <Button type='submit'>SignUp</Button>
          </Form>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Register