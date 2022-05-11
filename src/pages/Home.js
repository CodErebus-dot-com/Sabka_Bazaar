import React from "react";
import styled from 'styled-components';
import Carousel from "../components/Carousel";
import FlexCards from "../components/FlexCards";
import ErrorBoundary from "../components/ErrorBoundary";

const Container = styled.main`
  margin: 10px 10%;
`;

const Home = () => {
  return (
    <>
      <Container>
        <Carousel />
        <ErrorBoundary>
          <FlexCards />
        </ErrorBoundary>
      </Container>
    </>
  );
};

export default Home;