import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../contexts/GlobalContext';
import { NavLink } from 'react-router-dom';

const  Container = styled.aside`
  background-color: rgb(217,0,76);
  height: ${({ open }) => open ? '' : '35px'};
  overflow: ${({ open }) => open ? '' : 'hidden'}};  
`;

const UnorderedList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const DefaultListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #fff;
`;

const StyledLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  &:hover, &:visited, &:active, &:link, &:focus {
      text-decoration: none;
  }
  font-size: 16px;
`;

const ArrowIcon = styled.div`
  position: relative;
  right: 1.5rem;
  width: 0; 
  height: 0; 
  border-left: .5rem solid transparent;
  border-right: .5rem solid transparent;
  border-top: 1rem solid #fff;
`;

const Dropdown = () => {
  const { categories } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('All Products');

  const handleDropdownSelection = e => {
    setSelected(e.target.textContent);
    setOpen(!open);
  }

  return (
    <Container open={open}>
      <UnorderedList>
        <DefaultListItem onClick={() => setOpen(!open)}>
          <StyledLink to = {`/products`} onClick = {event => handleDropdownSelection(event)}>{selected}</StyledLink>
          <ArrowIcon />
        </DefaultListItem>
        {categories?.length > 0 && categories?.map(category => (
          <ListItem key = {category?.id}>
            <StyledLink to = {`/products/${category?.id}`} onClick = {event => handleDropdownSelection(event)}>{category?.name}</StyledLink>
          </ListItem>
        ))}
        <DefaultListItem>
          <StyledLink to = {`/products`} onClick = {event => handleDropdownSelection(event)}>All Products</StyledLink>
        </DefaultListItem>
      </UnorderedList>
    </Container>
  )
}

export default Dropdown;