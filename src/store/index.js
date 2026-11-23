import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import productsReducer from './slices/productsSlice';
import cartReducer, { saveCart } from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

// Сохраняем корзину в localStorage при каждом изменении
let prevItems = store.getState().cart.items;
store.subscribe(() => {
  const { items } = store.getState().cart;
  if (items !== prevItems) {
    prevItems = items;
    saveCart(items);
  }
});
