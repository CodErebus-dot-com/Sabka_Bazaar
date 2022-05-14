import React from 'react';

export const priceFormat = (price) => {
  return price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR'
  });
};


export const useProductsFilter = (products, id) => id ? products.filter(product => product?.category === id) : products;

export const smoothScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export const useAsyncError = () => {
  const [_, setError] = React.useState();
  return React.useCallback(error => {
    setError(() => {
      throw error;
    });
  }, [setError]);
}

const MIN_WIDTH_FOR_MOBILE = 480;
const MIN_WIDTH_FOR_TABLET = 768;
const MIN_WIDTH_FOR_DESKTOP = 1024;

export const isMobile = () => window.innerWidth < MIN_WIDTH_FOR_MOBILE;
export const isTablet = () => window.innerWidth <= MIN_WIDTH_FOR_DESKTOP && window.innerWidth >= MIN_WIDTH_FOR_TABLET;
export const isDesktop = () => window.innerWidth >= MIN_WIDTH_FOR_DESKTOP;