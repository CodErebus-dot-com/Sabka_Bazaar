import React, { useContext, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { GlobalContext } from '../contexts/GlobalContext';
import { priceFormat, smoothScrollToTop, isDesktop, isTablet, isMobile, isMoblet } from '../utils/Helper';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const Modal = styled.section`
    position: fixed;
    height: ${isTablet() ? '70vh' : (isDesktop() ? '80vh' : '100vh')};
    right: ${isTablet() ? '20px' : (isDesktop() ? '60px' : '')};
    width: ${isTablet() ? '50vw' : (isDesktop() ? '30vw' : '100vw')};
    z-index: 99;
    box-shadow: 5px 3px 30px #000;
    background-color: #fff;
    &.modal-open{
        animation: showModal 1s ease-in-out;
        bottom: 0;
    }
    @keyframes showModal{
        0%{
            bottom: ${isDesktop() ? '-80vh' : (isTablet() ? '-70vh' : ((isMobile() || isMoblet()) ? '-100vh' : ''))};
        }
        100%{
            bottom: 0;
        }
    }
    animation: hideModal 1s ease-in-out;
    @keyframes hideModal{
        0%{
            bottom: 0;
        }
        100%{
            bottom: ${isDesktop() ? '-80vh' : (isTablet() ? '-70vh' : ((isMobile() || isMoblet()) ? '-100vh' : ''))};
        }
    }
`;

const ModalHeader = styled.div`
    height: ${isDesktop() ? '10%' : '5%'};
    background-color: #2b2d2f;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;
const ModalTitle = styled.h1`
    font-size: ${isDesktop() ? '20px' : '16px'};
`;
const ModalCloseButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #fff;
    font-weight: 600;
    font-size: ${isDesktop() ? '20px' : '16px'};
    &:hover{
        transform: scale(1.1);
        transition: all 0.3s ease-in-out;
    }
`;
const ModalBody = styled.div`
    height: ${isDesktop() ? '70%' : '80%'};
    overflow-y: auto;
`;

const EmptyCart = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    top: 50%;
    position: relative;
`;

const Title = styled.h1`
    font-size: ${isDesktop() ? '18px' : '16px'};
`;

const Subtitle = styled.p`
    font-size: ${isDesktop() ? '16px' : '14px'};
    margin-top: 10px;
`

const CartBody = styled.div`
    background-color: lightgray;
    height: 100%;
    overflow-y: auto;
`;

const CartWrapper = styled.div`
    background-color: #fff;
    display: flex;
    height: 70px;
    align-items: center;
    padding: 20px;
`;

const Image = styled.img`
  height: 50px;
`;

const CartItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    margin-left: 20px;
`;

const Price = styled.div`
    font-weight: 600;
    font-size: ${isDesktop() ? '18px' : '16px'};
`;

const CounterWrapper = styled.div`
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PricingWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Counter = styled.button`
    font-size: ${isDesktop() ? '20px' : '16px'};
    cursor: pointer;
    background-color: rgb(217,0,76);
    color: white;
    border-radius: 5px;
    height: 25px;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    &:hover {
        background-color: rgb(190,0,50);
        transition: .5s;
    }
    &:disabled {
        background-color: #cccccc;
        color: black;
        cursor: not-allowed;
    }
`;

const Text = styled.p`
    margin: 0 10px;
    font-size: ${isDesktop() ? '16px' : '14px'};
`;

const LowestPriceWrapper = styled.div`
    background-color: #fff;
    margin: 10px 10px 0;
    padding: 5px 10px; 
    display: flex;
    align-items: center;
`;

const LowestPriceImage = styled.img`
    width: 100px;
    height: 40px;
    margin-right: 10px;
`;

const ModalFooter = styled.div`
    height: ${isDesktop() ? '20%' : '15%'};
    margin: ${isDesktop() ? '20px' : '10px'};  
`;

const CartFooterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CartFooter = styled.button`
    display: flex;
    Width: 100%;
    justify-content: space-between;
    background-color: rgb(217,0,76);
    margin: 20px 0;
    color: white;
    border-radius: 2px;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: rgb(190,0,50);
        transition: .5s;
    }
    padding: 15px;
    &.empty-cart {
        display: flex;
        justify-content: center;
    }
`;


const ModalPortal = ({openModal, modal}) => {
    const { cart, setCart, handleAddProduct } = useContext(GlobalContext);
    const totalItemsInCart = cart.reduce((acc, curr) => (acc + curr.quantity), 0);
    const cartTotal = cart.reduce((acc, curr) => (acc + curr.quantity * curr.price), 0);
    
    const handleRemoveProduct = (product) => {
        const ProductAlreadyInCart = cart.find(item => item.id === product.id);
        if (ProductAlreadyInCart.quantity === 1) {
            setCart(cart.filter(item => item.id !== product.id));
        } else {
            setCart(cart.map(item => item.id === product.id ? { ...ProductAlreadyInCart, quantity: ProductAlreadyInCart.quantity - 1, stock: ProductAlreadyInCart.stock + 1 } : item));
        }
    }

    const navigate = useNavigate();    
    const handleStartShopping = useCallback(() => {
        navigate('/products', {replace: true});
        openModal(!modal);
        smoothScrollToTop();
    }, [navigate]);
   
    return ReactDOM.createPortal(
    <Modal className={modal && 'modal-open'}>
        <ErrorBoundary>
            <ModalHeader>
                <ModalTitle>My Cart ({totalItemsInCart} {totalItemsInCart === 1 ? ' Item' : ' Items'})</ModalTitle>
                <ModalCloseButton onClick={() => openModal(!modal)}>X</ModalCloseButton>
            </ModalHeader>
            <ModalBody>
            {
                totalItemsInCart === 0 ? (
                    <EmptyCart>
                        <Title>No items in your cart</Title>
                        <Subtitle>Your favorite items are just a click away</Subtitle>
                    </EmptyCart>        
                ) : (
                    <CartBody>
                    {
                        cart?.length > 0 && cart?.map(item => {
                            return (
                                <CartWrapper key={item?.id}>
                                    <Image src={item?.imageURL} alt={item?.name} />
                                    <CartItemWrapper>
                                        <Title>{item?.name}</Title>
                                        <PricingWrapper>
                                            <CounterWrapper>
                                                <Counter onClick={() => handleRemoveProduct(item)}>-</Counter>
                                                <Text>{item?.quantity}</Text>
                                                <Counter onClick={() => handleAddProduct(item)} disabled={item?.stock === 0}>+</Counter>
                                                <Text>X {item?.price}</Text>
                                            </CounterWrapper>
                                            <Price>{priceFormat(item?.price  * item?.quantity)}</Price>
                                        </PricingWrapper>
                                    </CartItemWrapper>
                                </CartWrapper>
                            )
                        })
                    }
                        <LowestPriceWrapper>
                            <LowestPriceImage src={process.env.PUBLIC_URL + 'static/images/lowest-price.png'} alt='Lowest Price Guaranteed' />
                            <Text>You won't find it cheaper anywhere</Text>      
                        </LowestPriceWrapper>
                    </CartBody>
                )
            }
            </ModalBody>
            <ModalFooter>
                <CartFooterWrapper>
                {
                    totalItemsInCart === 0 ? (
                        
                            <CartFooter className='empty-cart' onClick={handleStartShopping}>
                                <Text>Start Shopping</Text>
                            </CartFooter>
                        
                    ) : (
                        <>
                            <Text>Promo code can be applied on payment page</Text>
                            <CartFooter>
                                <Text>Proceed to checkout</Text><Text>{priceFormat(cartTotal)}</Text>
                            </CartFooter>
                        </>
                    )
                }
                </CartFooterWrapper>
            </ModalFooter>
        </ErrorBoundary>
    </Modal>,  
    document.getElementById('modal-root'))   
}

export default ModalPortal;