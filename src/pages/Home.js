import React from "react";
import styled from 'styled-components';
import Carousel from "../components/Carousel";
import FlexCards from "../components/FlexCards";
import { isDesktop } from "../utils/Helper";

const Container = styled.section`
  margin: ${isDesktop() ? '10px 10%' : '0'};
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