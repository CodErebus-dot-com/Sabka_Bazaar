import React from 'react'
import styled from 'styled-components'

const Container = styled.footer`
    background-color: rgba(105,105,105,0.2);
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Footer = () => {
  return (
    <Container>
        Copyright &copy; 2011-2022 Sabka Baazar Gorcery Supplies Pvt. Ltd.
    </Container>
  )
}

export default Footer