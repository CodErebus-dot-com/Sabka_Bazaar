import React from "react";
import styled from 'styled-components';
import Carousel from "../components/Carousel";
import FlexCards from "../components/FlexCards";
import { isTablet, isDesktop } from "../utils/Helper";

const Container = styled.main`
  margin: ${isTablet() ? '0' : (isDesktop ? '10px 10%' : '')};
`;

const Home = () => {
  return (
    <>
      <Container>
        <Carousel />
        <FlexCards />
      </Container>
    </>
  );
};

export default Home;