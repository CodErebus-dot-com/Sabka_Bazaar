import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import ModalPortal from './ModalPortal';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { isTablet, isDesktop } from '../utils/Helper';

const Container = styled.header`
    height: ${isTablet() ? '80px' : (isDesktop() ? '100px' : '')};
    /* display: flex;
    justify-content: center;
    align-items: center; */
    box-shadow: 0px 5px 5px 1px rgba(0,0,0,0.1);
    padding: ${isTablet() ? '0' : (isDesktop() ? '10px 10%' : '')};
`;

const Wrapper = styled.nav`
    display: flex;
    min-width: 100%;
`;

const Left = styled.div`
    flex: .5;
    display: flex;
    align-items: center;
`;
const Center = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: ${isTablet() ? 'flex-end' : (isDesktop() ? 'center' : '')};
`;

const Logo = styled.img`
    height: ${isTablet() ? '80%' : (isDesktop() ? '100%' : '')};
`;

const CenterListItem = styled.span`
    font-size: 18px;
    cursor: pointer;
    font-weight: 600;
    opacity: 0.75;
    color: #2b2d2f;
    margin-left: 25px;
`;

const RightListItem = styled.div`
    display: flex;
`;

const CartIcon = styled.div`
    display: flex;
    background-color: rgba(105,105,105,0.1);
    border: 1px solid rgba(105,105,105, .5);
    border-radius: 2px;
    padding: .5rem 1rem;
    cursor: pointer;
`;

const CartListItem = styled.span`
    font-size: 14px;
    cursor: pointer;
    font-weight: 600;
    opacity: 0.75;
    color: #2b2d2f;
    margin-left: 25px;
`;

const CartSubListItem = styled.span`
    display: flex;
    align-items: flex-end;
    font-weight: 500;
    font-size: 16px;
`;

const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    &.navlink-hover {
        display: inline-block;
        color: #000;
        text-decoration: none;
    }
    &.navlink-hover::after {
        content: '';
        display: block;
        width: 0;
        margin: auto;
        height: 5px;
        background: transparent;
        transition: width .5s ease, background-color .5s ease;
    }
    &.navlink-hover:hover::after {
        width: 100%;
        background-color: #2b2d2f;
    }
    &.active {
        color: rgb(217,0,76);
        border-bottom: 5px solid rgb(217,0,76);
        &.navlink-hover::after {
            width: 0;
        }
    }
    &:active, &:focus, &:visited {
        outline: none;
    }
`;

const Navbar = ({openModal, modal}) => {
    const { cart } = useContext(GlobalContext);
    const totalItemsInCart = cart.reduce((acc, curr) => (acc + curr.quantity), 0);
    
    
  return (
    <Container>
        <Wrapper>
            <Left>
                <Logo src={process.env.PUBLIC_URL + 'static/images/logo.png'} alt="Sabka Bazaar Logo" />
            </Left>
            <Center>
                <CenterListItem><StyledLink to = '/' className='navlink-hover'>Home</StyledLink></CenterListItem>
                <CenterListItem><StyledLink to = '/products' className='navlink-hover'>Products</StyledLink></CenterListItem>
            </Center>
            <Right>
                <RightListItem>
                    <CartListItem><StyledLink to = '/signin' className='navlink-hover'>Sign In</StyledLink></CartListItem>
                    <CartListItem><StyledLink to = '/register' className='navlink-hover'>Register</StyledLink></CartListItem>
                </RightListItem>
                <CartIcon onClick={() => openModal(true)}>
                    <img src={process.env.PUBLIC_URL + 'static/images/cart.svg'} alt='Cart Icon' style = {{height: 30, width: 50}} />
                    <CartSubListItem>{totalItemsInCart} {totalItemsInCart === 1 ? ' Item' : ' Items'}</CartSubListItem>
                </CartIcon>
                {modal && <ModalPortal openModal={openModal} modal={modal} />}
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar