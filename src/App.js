import React, { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import NoMatch from './pages/NoMatch';
import { GlobalContext } from './contexts/GlobalContext';
import { AuthProvider } from './contexts/auth';
import { useCategoriesFilter } from './utils/Helper';
const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/Products'));
import Profile from './pages/Profile';
import RequireAuth from './components/RequireAuth';
import SuspenseFallbackUI from './pages/SuspenseFallbackUI';
// import { useAsyncError } from './utils/Helper';

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
  overflow: hidden;
`;

const BodyWrapper = styled.main`
`;


const App = () => {
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [cart, setCart] = useState([]);

  // const throwError = useAsyncError();

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
          setCategories(useCategoriesFilter(data));
      } catch (err) {
          // throwError(new Error("Asynchronous Error"));
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
      <AuthProvider>
      <GlobalContext.Provider value={{categories, cart, setCart, handleAddProduct}}>
        <Wrapper className={modal && 'modal-open'} onClick={event => modal && !event.target.closest('.modal') && openModal(!modal)}>
          <Navbar openModal={openModal} modal={modal} />
          <BodyWrapper>
            <Routes>
              <Route path = "/" element = {<Suspense fallback={<SuspenseFallbackUI />}><Home /></Suspense>} />
              <Route path = "products" element = {<Suspense fallback={<SuspenseFallbackUI />}><Products /></Suspense>}>
                <Route index element = {<Suspense fallback={<SuspenseFallbackUI />}><Products /></Suspense>} />
                <Route path = ":id" element = {<Suspense fallback={<SuspenseFallbackUI />}><Products /></Suspense>} />
              </Route>
              <Route path = "profile" element = {<RequireAuth><Profile /></RequireAuth>} />
              <Route path = "register" element = {<Register />} />
              <Route path = "signin" element = {<Signin />} />
              <Route path = "*" element = {<NoMatch/>} />
            </Routes>
          </BodyWrapper>
          <Footer />
        </Wrapper>
      </GlobalContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  </>
};

export default App;