import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Dropdown from '../components/Dropdown';
import Catalogue from '../components/Catalogue';
import ErrorBoundary from '../components/ErrorBoundary';
import { isDesktop, isMobile } from '../utils/Helper';

const Container = styled.main`
  margin: ${isDesktop() ? '10px 20%' : ''};
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




           
          