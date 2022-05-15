import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import ModalPortal from './ModalPortal';
import { isTablet, isDesktop, isMobile } from '../utils/Helper';
import CartIcon from './CartIcon';
import Burger from './Burger';

const Container = styled.header`
    height: ${isTablet() ? '80px' : (isDesktop() ? '100px' : '60px')};
    // display: flex;
    // justify-content: center;
    // align-items: center;
    box-shadow: 0px 5px 5px 1px rgba(0,0,0,0.1);
    padding: ${isTablet() ? '0' : (isDesktop() ? '10px 10%' : '')};
    margin-bottom: ${isTablet() ? '20px' : (isDesktop() ? '' : '')};
    z-index: 9;
    background-color: #fff;
`;

const Wrapper = styled.nav`
    display: flex;
    min-width: 100%;
    height: 100%;
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
    flex-direction: row nowrap; 
    justify-content: flex-end;
    align-items: ${isTablet() ? 'flex-end' : (isDesktop() ? 'center' : '')};
`;

const Logo = styled.img`
    height: ${isTablet() ? '70px' : (isDesktop() ? '100%' : '50px')};
    width: ${isTablet() ? '140px' : (isDesktop() ? '100%' : '100px')};
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
    flex-direction: column;
`;

const CartListItem = styled.span`
    font-size: 14px;
    cursor: pointer;
    font-weight: 600;
    opacity: 0.75;
    color: #2b2d2f;
    margin-left: 25px;
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
    
  return (
    <Container>
        <Wrapper>
            <Left>
                <NavLink to = '/'>
                    <Logo src={process.env.PUBLIC_URL + 'static/images/logo.png'} alt="Sabka Bazaar Logo" />
                </NavLink>
            </Left>
            <Center>
            {
                isMobile() ? '' : (<>
                    <CenterListItem><StyledLink to = '/' className='navlink-hover'>Home</StyledLink></CenterListItem>
                    <CenterListItem><StyledLink to = '/products' className='navlink-hover'>Products</StyledLink></CenterListItem>
                </>)
            }   
            </Center>
            <Right>
            {
                isMobile() ? (<Burger />) : (
                    <RightListItem>
                        <CartListItem><StyledLink to = '/signin' className='navlink-hover'>Sign In</StyledLink></CartListItem>
                        <CartListItem><StyledLink to = '/register' className='navlink-hover'>Register</StyledLink></CartListItem>
                        <CartIcon openModal={openModal} />
                        {modal && <ModalPortal openModal={openModal} modal={modal} />}
                    </RightListItem>
                )
            }
                
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar