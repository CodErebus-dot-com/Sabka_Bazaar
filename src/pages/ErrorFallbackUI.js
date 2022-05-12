import styled from 'styled-components';

const Container = styled.main`
    display: flex;
    align-items: center;
    border: 3px solid #ff1919;
    border-radius: 10px;
    height: 100px;
    margin: 10px 0;
    width: 100%;
`;

const ErrorWrapper = styled.div``;

const Text = styled.h1`
    font-size: 20px;
    color: #2b2d2f;
`;

const ErrorMessage = styled.div``;

const ErrorFallbackUI = ({ errorMessage }) => {
  return (
    <Container>
      <ErrorWrapper>
        <Text>There was a problem displaying the article:</Text>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </ErrorWrapper>
    </Container>
  );
}

export default ErrorFallbackUI;