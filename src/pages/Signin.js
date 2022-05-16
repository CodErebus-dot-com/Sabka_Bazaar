import styled from 'styled-components';

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

const Signin = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Login</Title>
          <Subtitle>Get Access to your Orders, Wishlist and Recommendations</Subtitle>
        </Left>
        <Right>
          <Form>
            <Input type='email' placeholder='Email' name='email' htmlFor='email'required />
            <Input type='password' placeholder='Password' name='password' htmlFor='password' required />
            <Button>SignUp</Button>
          </Form>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Signin