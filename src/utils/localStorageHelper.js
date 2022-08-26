export const store = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const read = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));

  if (Array.isArray(cart)) {
    return cart;
  }

  return [];
};
