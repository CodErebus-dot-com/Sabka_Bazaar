import React from "react";
import styled from 'styled-components';
import Carousel from "../components/Carousel";
import FlexCards from "../components/FlexCards";

const Container = styled.main`
  margin: 10px 10%;
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