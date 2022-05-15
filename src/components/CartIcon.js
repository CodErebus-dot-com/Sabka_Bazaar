import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../contexts/GlobalContext';
import { isTablet, isDesktop } from '../utils/Helper';

const Container = styled.div`
    display: flex;
    background-color: rgba(105,105,105,0.1);
    border: 1px solid rgba(105,105,105, .5);
    border-radius: 2px;
    padding: .5rem 1rem;
    padding: ${isTablet() ? '.5rem' : (isDesktop() ? '.5rem 1rem' : '')};
    cursor: pointer;
`;


const CartListItem = styled.span`
    display: flex;
    align-items: flex-end;
    font-weight: 500;
    font-size: 16px;
`;

const Image = styled.img`
    height: 30px;
    width: 50px;
`;

const CartIcon = ({openModal}) => {
    const { cart } = useContext(GlobalContext);
    const totalItemsInCart = cart.reduce((acc, curr) => (acc + curr.quantity), 0);

  return (
    <Container onClick={() => openModal(true)}>
        <Image src={process.env.PUBLIC_URL + 'static/images/cart.svg'} alt='Cart Icon' />
        <CartListItem>{totalItemsInCart} {totalItemsInCart === 1 ? ' Item' : ' Items'}</CartListItem>
    </Container>
  )
}

export default CartIcon;