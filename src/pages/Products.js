import React, { Suspense } from 'react';
import styled from 'styled-components';
import ErrorBoundary from '../components/ErrorBoundary';
import { isDesktop, isMobile } from '../utils/Helper';
const Sidebar = React.lazy(() => import('../components/Sidebar'));
const Dropdown = React.lazy(() => import('../components/Dropdown'));
const Catalogue = React.lazy(() => import('../components/Catalogue'));

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
          <Suspense fallback={<div>Loading...</div>}>
            {isMobile() ? <Dropdown /> : <Sidebar />}
            <Catalogue />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </>
  )
}

export default Products




           
          