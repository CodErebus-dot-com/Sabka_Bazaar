import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import NoMatch from './pages/NoMatch';
import { GlobalContext } from './contexts/GlobalContext';


const Wrapper = styled.div`
  &.modal-open:before {
    content: "";  
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 9;
  }
  &.modal-open {
    display: block;
  }
`;

const BodyWrapper = styled.div`
  min-height: 100vh;
`;


const App = () => {
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [cart, setCart] = useState([]);

  const openModal = (arg) => {
      setModal(arg);
  }
  useEffect(() => {
      fetchCategories();
  }, []);

  const fetchCategories = async () => {
      try{
          const res = await fetch('http://localhost:5000/categories');
          const data = await res.json();
          setCategories(data);
      } catch (err) {
          console.log(err);
      } 
  }

  const handleAddProduct = (product) => {
    const ProductAlreadyInCart = cart.find(item => item.id === product.id);
    if (ProductAlreadyInCart) {
      setCart(cart.map(item => item.id === product.id ? { ...ProductAlreadyInCart, quantity: ProductAlreadyInCart.quantity + 1, stock: ProductAlreadyInCart.stock - 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1, stock: product.stock - 1 }]);
    }
  }

  return <>
    <BrowserRouter>
      <GlobalContext.Provider value={{categories, cart, setCart, handleAddProduct}}>
        <Wrapper className={modal && 'modal-open'} onClick={event => modal && !event.target.closest('.modal') && openModal(!modal)}>
          <Navbar openModal={openModal} modal={modal} />
            <BodyWrapper>
              <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path = "products" element = {<Products />}>
                  <Route index element = {<Products />} />
                  <Route path = ":id" element = {<Products />} />
                </Route>
                <Route path = "register" element = {<Register />} />
                <Route path = "signin" element = {<Signin />} />
                <Route path = "*" element = {<NoMatch/>} />
              </Routes>
            </BodyWrapper>
          <Footer />
        </Wrapper>
      </GlobalContext.Provider>
    </BrowserRouter>
  </>
};

export default App;