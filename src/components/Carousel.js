import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import ErrorBoundary from './ErrorBoundary';
import { isTablet, isDesktop } from '../utils/Helper';

const Container = styled.section`
    height: ${isTablet() ? '30vh' : (isDesktop() ? '40vh' : '')};
    display: flex;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 5px 5px 1px rgba(0,0,0,0.1);
`;

const NavButtons = styled.button`
    cursor: pointer;
    background-color: rgba(0,0,0,0.5);
    color: #fff;
    border: 1px solid #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: .5rem 1rem;
    padding: ${isTablet() ? '0 .5rem' : (isDesktop() ? '.5rem 1rem' : '')};
    height: ${isTablet() ? '40px' : (isDesktop() ? '50px' : '')};
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props => props.navButton === 'back_button' && '0%'};
    right: ${props => props.navButton === 'next_button' && '0%'};
    &:hover {
        background-color: #2b2d2f;
        transform: scale(1.1);
        transition: all 0.3s ease-in-out;
    }
    &:active, &:focus, &:visited {
        outline: none;
    }
    z-index: 2;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${props => props.slideIndex * -100}vw);
    transition: transform 1.5s ease;
`;

const Slide = styled.div`
    height: ${isTablet() ? '25vh' : (isDesktop() ? '35vh' : '')};
    width: 100vw;
    display: flex;
    align-items: center;
`;

const Image = styled.img`
    height: 100%;
    width: ${isTablet() ? '100%' : (isDesktop() ? '60%' : '')};
`;

const CarouselDots = styled.div`
    position: absolute;
    display: flex;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
`;

const Dot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 0 10px;
    background: #a9a9a9;
    &:hover {
        background-color: #2b2d2f;
        transition: .5s;
    }
    &.active {
        background-color: #2b2d2f;
    }
`;

const Carousel = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [banners, setBanners] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            handleClick('next');
        }, 3000);
        return () => clearInterval(interval);
    }, [slideIndex]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/banners')
            .then(res => res.json())
            .catch(err => console.log(err));
            setBanners(response);
        }
        fetchData();
    }, []);

    const handleClick = (direction) => {
        direction === 'back' && setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 4);
        direction === 'next' && setSlideIndex(slideIndex < 4 ? slideIndex + 1 : 0);
    }
    
  return (
      <ErrorBoundary>
        <Container>
            <NavButtons navButton = 'back_button' onClick = {() => handleClick('back')}>Back</NavButtons>
            <Wrapper slideIndex = {slideIndex}>
                {banners?.length > 0 && banners?.map(banner => (
                    <Slide key = {banner?.id}>
                        <Image src = {banner?.bannerImageUrl} alt = {banner?.bannerImageAlt} />
                    </Slide>
                ))}
            </Wrapper>
            <CarouselDots>
                {banners?.length > 0 && banners.map((banner, index) => (
                    <Dot key = {banner.id} onClick={() => setSlideIndex(index)} className = {slideIndex === index && 'active'} />
                ))}
            </CarouselDots>
            <NavButtons navButton = 'next_button' onClick = {() => handleClick('next')}>Next</NavButtons>
        </Container>
    </ErrorBoundary>
  )
}

export default Carousel;