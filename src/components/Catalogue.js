import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { priceFormat, useProductsFilter, isDesktop, isTablet, isMobile, isMoblet } from '../utils/Helper';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';

const Container = styled.section`
    width: ${isMobile() ? '90%' : '100%'};  
    margin: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${isDesktop() ? '1fr 1fr 1fr' : (isTablet() ? 'repeat(auto-fill, minmax(200px, 1fr))' : '')};
  gap: 30px;
`;

const GridCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dotted black;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const RWDWrapper = styled.div`
  display: ${(isMobile() || isMoblet()) ? 'flex' : ''};
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: ${(isMobile() || isMoblet()) ? '' : '20px'};
`;

const CellHeader = styled.div`
  height: 50px;
`;

const Title = styled.h1`
  font-size: ${isDesktop() ? '18px' : '16px'};
`;

const Image = styled.img`
  height: ${isDesktop() ? '200px' : (isTablet() ? '150px' : '120px')};
  width: ${isDesktop() ? '200px' : (isTablet() ? '150px' : '120px')};
`;

const ProductInfoWrapper = styled.div`
  display: ${(isMobile() || isMoblet()) ? 'flex' : ''};
  flex-direction: ${(isMobile() || isMoblet()) ? 'column' : ''};
`;

const Description = styled.div`
  background-color: rgba(105,105,105, .1);
  padding: 10px;
  border-radius: 2px;
  border: 1px solid rgba(105,105,105, .5);
  height: 80px;
  font-size: ${isDesktop() ? '16px' : '14px'};
  overflow-y: scroll;
`;

const CellFooter = styled.div`
  margin: ${isMobile() ? '10px 0' : '20px 0'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.div`
  font-weight: 600;
`;

const Button = styled.button`
  background-color: rgb(217,0,76);
  color: white;
  padding: ${isMobile() ? '5px 10px' : '10px 50px'};
  border: none;
  border-radius: 2px;
  cursor: pointer;
  width: ${(isMobile() || isMoblet()) ? '100%' : ''};
  &:hover {
    background-color: rgb(190,0,50);
    transform: ${isMobile() ? '' : 'scale(1.1)'};
    transition: all 0.5s ease-in-out;
  }
  &:disabled {
    background-color: #cccccc;
    color: black;
    cursor: not-allowed;
  }
  &:active, &:focus, &:visited {
    outline: none;
  }
`;

const Catalogue = () => {
  const { handleAddProduct, cart } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  }

  const [filteredProducts, setFilteredProducts] = useState();

  useEffect(() => {
    const filtered = useProductsFilter(products, id);
    setFilteredProducts(filtered);
  }, [id, products]);

  return (
    <Container>
      <Grid>
        {
          filteredProducts?.length > 0 && filteredProducts?.map(obj => cart.find(item => item.id === obj.id) || obj)?.map(product => (
            <GridCell key = {product?.id}>
              <ContentContainer>
                <CellHeader>
                  <Title>{product?.name}</Title>
                </CellHeader>
                <RWDWrapper>
                  <ImageContainer>
                    <Image src = {product?.imageURL} alt = {product?.name}/>
                  </ImageContainer>
                  <ProductInfoWrapper>
                    <Description>{product?.description}</Description>
                    <CellFooter>
                      {(isMobile() || isMoblet()) ? '' : <Price>MRP {priceFormat(product?.price)}</Price>}
                      <Button onClick={() => handleAddProduct(product)} disabled={product?.stock === 0}>
                        Buy Now {(isMobile() || isMoblet()) ? ` @  ${priceFormat(product?.price)}` : ''}
                      </Button>
                    </CellFooter>
                  </ProductInfoWrapper>
                </RWDWrapper>
              </ContentContainer>
            </GridCell>
          ))
        }
      </Grid>
    </Container>
  )
}

export default Catalogue