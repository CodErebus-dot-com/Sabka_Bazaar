
import React, { useState } from 'react';
import styled from 'styled-components';
import RightNav from './RightNav';

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 1rem;
  right: 1.5rem;
  z-index: 10;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  transition: all .5s linear;
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? '#2b2d2f' : '#2b2d2f'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all .5s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const Burger = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav open={open} setOpen={setOpen}/>
    </>
  )
}

export default Burger;