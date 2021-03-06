import React from 'react';
import styled from 'styled-components';
import ErrorBoundary from '../components/ErrorBoundary';
import { isDesktop, isMobile } from '../utils/Helper';
import Sidebar from '../components/Sidebar';
import Dropdown from '../components/Dropdown';
import Catalogue from '../components/Catalogue';

const Container = styled.section`
  margin: ${isDesktop() ? '10px 10%' : ''};
  display: flex;
  flex-direction: ${isMobile() ? 'column' : 'row'};
`;

const Products = () => {
  return (
    <>
      <Container>
        <ErrorBoundary>
          {isMobile() ? <Dropdown /> : <Sidebar />}
          <Catalogue />
        </ErrorBoundary>
      </Container>
    </>
  )
}

export default Products




           
          