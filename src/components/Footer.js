import React from 'react'
import styled from 'styled-components'
import { isTablet, isDesktop } from '../utils/Helper'

const Container = styled.footer`
    background-color: rgba(105,105,105,0.2);
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${isTablet() ? '14px' : (isDesktop() ? '16px' : '12px')};
`;

const Footer = () => {
  return (
    <Container>
        Copyright &copy; 2011-2022 Sabka Baazar Gorcery Supplies Pvt. Ltd.
    </Container>
  )
}

export default Footer