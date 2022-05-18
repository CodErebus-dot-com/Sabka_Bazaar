import React, { Suspense } from "react";
import styled from 'styled-components';
import { isDesktop } from "../utils/Helper";
const Carousel = React.lazy(() => import('../components/Carousel'));
const FlexCards = React.lazy(() => import('../components/FlexCards'));

const Container = styled.section`
  margin: ${isDesktop() ? '10px 10%' : '0'};
`;

const Home = () => {
  return (
    <>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Carousel />
          <FlexCards />
        </Suspense>
      </Container>
    </>
  );
};

export default Home;