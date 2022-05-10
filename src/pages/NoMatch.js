import styled from 'styled-components';

const Container = styled.main`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Text = styled.h1`
    font-size: 50px;
    color: #2b2d2f;
`;

const NoMatch = () => {
  return (
    <Container>
        <Text>Sorry! Page Not Found...</Text>
    </Container>
  )
}

export default NoMatch;
