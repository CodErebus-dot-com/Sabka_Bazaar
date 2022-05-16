import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import { useContext } from 'react';
import { isDesktop, isTablet } from '../utils/Helper';

const Wrapper = styled.aside`
    display: flex;
    flex-direction: column;
    background-color: rgba(105,105,105,0.1);
    min-height: 100vh;
    border: 1px solid rgba(105,105,105, .5);
    height: auto;
    width: ${isTablet() ? '25vw' : (isDesktop ? '15vw' : '')};
`;

const StyledLink = styled(Link)`
    color: inherit;
    border-bottom: 1px solid black;
    margin: 10px 0;
    padding: 10px;
    text-decoration: none;
    &:hover, &:visited, &:active, &:link, &:focus {
        text-decoration: none;
    }
    font-size: ${isTablet() ? '14px' : (isDesktop() ? '16px' : '')};
`;

const Sidebar = () => {
    const { categories } = useContext(GlobalContext);
  return (
    <>
        <Wrapper>
            {categories?.length > 0 && categories?.map((category) => (
                <StyledLink key = {category?.id} to = {`/products/${category?.id}`}>{category?.name}</StyledLink>
            ))}
        </Wrapper>
    </>
  )
}

export default Sidebar