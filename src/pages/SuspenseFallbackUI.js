import styled from 'styled-components';

const Container = styled.section`
    display: flex;
    align-items: center;
    height: 100px;
    margin: 10px 0;
    width: 100%;
`;

const SuspenseWrapper = styled.div``;

const LoadingMessage = styled.h1`
    font-size: 32px;
    color: #2b2d2f;
`;

const SuspenseFallbackUI = () => {
  return (
    <Container>
      <SuspenseWrapper>
        <LoadingMessage>Loading...</LoadingMessage>
      </SuspenseWrapper>
    </Container>
  );
}

export default SuspenseFallbackUI;