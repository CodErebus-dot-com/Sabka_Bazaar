import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useCallback } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import ErrorBoundary from './ErrorBoundary';
import { isTablet, isDesktop } from '../utils/Helper';

const Section = styled.section``;

const Container = styled.article`
    display: flex;
    align-items: center;
    height: ${isTablet() ? '15vh' : (isDesktop() ? '25vh' : '')};
    box-shadow: 0px 5px 5px 1px rgba(0,0,0,0.1);
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    height: ${isTablet() ? '120px' : (isDesktop() ? '150px' : '')};
`;

const ContentContainer = styled.div`
    flex: 3;
    display: flex;
    justify-content: center;
    text-align: center;
`;

const Wrapper = styled.div``;

const Title = styled.h1`
    font-size: 20px;
    font-size: ${isTablet() ? '16px' : (isDesktop() ? '20px' : '')};
    margin-bottom: 10px;
`;
const Subtitle = styled.p`
    margin-bottom: 10px;
    font-size: ${isTablet() ? '14px' : (isDesktop() ? '16px' : '')};
`;

const Button = styled.button`
    background-color: rgb(217,0,76);
    color: white;
    padding: 10px;
    border-radius: 2px;
    font-size: ${isTablet() ? '14px' : (isDesktop() ? '16px' : '')};
    border: none;
    cursor: pointer;
    &:hover {
        background-color: rgb(190,0,50);
        transform: scale(1.1);
        transition: all 0.5s ease-in-out;
    }
    &:active, &:focus, &:visited {
        outline: none;
    }
`;

const FlexCards = () => {
    const navigate = useNavigate();
    const handleProductCategories = useCallback((id) => {
        navigate(`/products/${id}`, {replace: true});
        window.scrollTo(0, 0);
    }, [navigate]);

    const { categories } = useContext(GlobalContext);

  return (
    <Section>
        {categories?.length > 0 && categories?.sort((a,b) => a.order-b.order)?.map((category) => (
            category?.enabled && (
                category?.order % 2 === 0 ? (
                    <ErrorBoundary>
                    <Container key={category?.id}>  
                            <ContentContainer>
                                <Wrapper>    
                                    <Title>{category?.name}</Title>
                                    <Subtitle>{category?.description}</Subtitle>
                                    <Button onClick={() => handleProductCategories(category?.id)}>Explore {category?.key}</Button>
                                </Wrapper>
                            </ContentContainer>
                            <ImgContainer>
                                <Image src = {category?.imageUrl} />
                            </ImgContainer>
                        </Container>        
                    </ErrorBoundary>
                ) : 
                (
                    <ErrorBoundary>  
                        <Container key={category?.id}>
                            <ImgContainer>
                                <Image src = {category?.imageUrl} />
                            </ImgContainer>
                            <ContentContainer>
                                <Wrapper>
                                    <Title>{category?.name}</Title>
                                    <Subtitle>{category?.description}</Subtitle>
                                    <Button onClick={() => handleProductCategories(category?.id)}>Explore {category?.key}</Button>
                                </Wrapper>
                            </ContentContainer>
                        </Container>
                    </ErrorBoundary>
                )
            )
        ))}
    </Section>
  )
}

export default FlexCards