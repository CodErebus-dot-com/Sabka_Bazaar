import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import { isMobile } from '../utils/Helper';

const Ul = styled.ul`
  list-style: none;
    flex-flow: column nowrap;
    background-color: #fff;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding-top: 3.5rem;
    transition: transform 0.5s ease-in-out;
    z-index: 9;
`;

const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    &.navlink-hover {
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
        border-bottom: '2px solid rgb(217,0,76)';
        &.navlink-hover::after {
            width: 0;
        }
    }
    &:active, &:focus, &:visited {
        outline: none;
    }
`;

const ListItem = styled.li`
    padding: 18px 10px;
`;

const RightNav = ({ open, setOpen }) => {
  return (
    <Ul open={open}>
      <ListItem onClick={() => setOpen(!open)}><StyledLink to='/' className='navlink-hover'>Home</StyledLink></ListItem>
      <ListItem onClick={() => setOpen(!open)}><StyledLink to='/products' className='navlink-hover'>Products</StyledLink></ListItem>
      <ListItem onClick={() => setOpen(!open)}><StyledLink to='/signin' className='navlink-hover'>Sign In</StyledLink></ListItem>
      <ListItem onClick={() => setOpen(!open)}><StyledLink to='/register' className='navlink-hover'>Register</StyledLink></ListItem>
    </Ul>
  )
}

export default RightNav;