import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Catalogue from '../components/Catalogue';
import ErrorBoundary from '../components/ErrorBoundary';

const Container = styled.main`
  margin: 10px 10%;
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




           
          