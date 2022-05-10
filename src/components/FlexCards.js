import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useCallback } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

const Section = styled.section``;

const Container = styled.article`
    display: flex;
    align-items: center;
    height: 25vh;
    box-shadow: 0px 5px 5px 1px rgba(0,0,0,0.1);
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    height: 150px;
    widht: 150px;
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
    margin-bottom: 10px;
`;
const Subtitle = styled.div`
    margin-bottom: 10px;
`;

const Button = styled.button`
    background-color: rgb(217,0,76);
    color: white;
    padding: 10px;
    border-radius: 2px;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: rgb(190,0,50);
        transition: .5s;
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
                ) : 
                (
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
                )
            )
        ))}
    </Section>
  )
}

export default FlexCards