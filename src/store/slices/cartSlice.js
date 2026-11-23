import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'garden-shop-cart';

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

export const saveCart = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage недоступен — корзина просто не сохранится
  }
};

const cartSlice = createSlice({
  name: 'cart',
  // элемент корзины: { id, title, image, price, discont_price, count }
  initialState: { items: loadCart() },
  reducers: {
    addToCart(state, action) {
      const { product, count = 1 } = action.payload;
      const item = state.items.find((el) => el.id === product.id);
      if (item) {
        item.count += count;
      } else {
        const { id, title, image, price, discont_price } = product;
        state.items.push({ id, title, image, price, discont_price, count });
      }
    },
    increment(state, action) {
      const item = state.items.find((el) => el.id === action.payload);
      if (item) item.count += 1;
    },
    decrement(state, action) {
      const item = state.items.find((el) => el.id === action.payload);
      if (item && item.count > 1) item.count -= 1;
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((el) => el.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, increment, decrement, removeFromCart, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, el) => sum + el.count, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (sum, el) => sum + (el.discont_price ?? el.price) * el.count,
    0
  );

export default cartSlice.reducer;
