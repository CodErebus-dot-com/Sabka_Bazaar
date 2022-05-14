import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Catalogue from '../components/Catalogue';
import ErrorBoundary from '../components/ErrorBoundary';
import { isTablet, isDesktop } from '../utils/Helper';

const Container = styled.main`
  margin: ${isTablet() ? '0' : (isDesktop ? '10px 10%' : '')};
  display: flex;
`;

const Products = () => {

  return (
    <>
      <Container>
        <ErrorBoundary>
          <Sidebar />
          <Catalogue />
        </ErrorBoundary>
      </Container>
    </>
  )
}

export default Products




           
          