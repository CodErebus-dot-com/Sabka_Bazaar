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
