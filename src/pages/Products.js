import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Catalogue from '../components/Catalogue';

const Container = styled.main`
  margin: 10px 10%;
  display: flex;
`;

const Products = () => {

  return (
    <>
      <Container>
          <Sidebar />
          <Catalogue />
      </Container>
    </>
  )
}

export default Products




           
          