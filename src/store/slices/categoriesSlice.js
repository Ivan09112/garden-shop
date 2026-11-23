import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  () => api.getCategories()
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
