import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', () =>
  api.getProducts()
);

export const fetchCategoryProducts = createAsyncThunk(
  'products/fetchCategoryProducts',
  (id) => api.getCategoryProducts(id)
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id) => {
    const data = await api.getProduct(id);
    return data[0];
  }
);

const loadingState = { status: 'idle', error: null };

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    all: { list: [], ...loadingState },
    category: { info: null, list: [], ...loadingState },
    current: { item: null, ...loadingState },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // все товары
      .addCase(fetchProducts.pending, (state) => {
        state.all.status = 'loading';
        state.all.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.all.status = 'succeeded';
        state.all.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.all.status = 'failed';
        state.all.error = action.error.message;
      })
      // товары категории
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.category.status = 'loading';
        state.category.error = null;
        state.category.list = [];
        state.category.info = null;
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.category.status = 'succeeded';
        state.category.info = action.payload.category;
        state.category.list = action.payload.data;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.category.status = 'failed';
        state.category.error = action.error.message;
      })
      // один товар
      .addCase(fetchProduct.pending, (state) => {
        state.current.status = 'loading';
        state.current.error = null;
        state.current.item = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.current.status = 'succeeded';
        state.current.item = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.current.status = 'failed';
        state.current.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
