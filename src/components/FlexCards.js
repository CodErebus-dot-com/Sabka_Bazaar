import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useCallback } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import ErrorBoundary from './ErrorBoundary';
import { isTablet, isDesktop, isMobile, isMoblet } from '../utils/Helper';

const Section = styled.section``;

const Container = styled.article`
    display: flex;
    align-items: center;
    height: ${isTablet() ? '15vh' : ((isDesktop() || isMoblet()) ? '25vh' : '20vh')};
    box-shadow: 0px 5px 5px 1px rgba(0,0,0,0.1);
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    height: ${(isTablet() || isMoblet()) ? '120px' : (isDesktop() ? '150px' : '80px')};
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
    font-size: ${isDesktop() ? '20px' : '16px'};
    margin-bottom: 10px;
`;
const Subtitle = styled.p`
    margin-bottom: 10px;
    font-size: ${isDesktop() ? '16px' : '14px'};
`;

const Button = styled.button`
    background-color: rgb(217,0,76);
    color: white;
    padding: ${isMobile() ? '5px' : '10px'};
    border-radius: 2px;
    font-weight: 500;
    font-size: ${isDesktop() ? '16px' : '14px'};
    border: none;
    cursor: pointer;
    &:hover {
        background-color: rgb(190,0,50);
        transform: ${isMobile() ? '' : 'scale(1.1)'};
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
        {categories?.length > 0 && categories?.map((category) => (
                category?.order % 2 === 0 ? (
                    <ErrorBoundary key={category?.id}>
                    <Container>  
                            <ContentContainer>
                                <Wrapper>    
                                    <Title>{category?.name}</Title>
                                    <Subtitle>{category?.description}</Subtitle>
                                    <Button onClick={() => handleProductCategories(category?.id)}>Explore {category?.key}</Button>
                                </Wrapper>
                            </ContentContainer>
                            <ImgContainer>
                                <Image src = {category?.imageUrl} alt = {category?.name}/>
                            </ImgContainer>
                        </Container>        
                    </ErrorBoundary>
                ) : 
                (
                    <ErrorBoundary key={category?.id}>  
                        <Container>
                            <ImgContainer>
                                <Image src = {category?.imageUrl} alt = {category?.name}/>
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
        ))}
    </Section>
  )
}

export default FlexCards