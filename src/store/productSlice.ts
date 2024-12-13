import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '@shared/types/IProduct';
import { LoadingStatus } from '@shared/types/enums';
import { fetchProductById } from './api/fetchProductById';
import { editProduct } from './api/editProduct';

export interface ProductState {
  loading: LoadingStatus;
  error: string | null | undefined;
  product: IProduct | null;
}

const initialState: ProductState = {
  loading: LoadingStatus.IDLE,
  error: null,
  product: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = LoadingStatus.LOADING;
      state.error = null;
      state.product = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = LoadingStatus.SUCCEEDED;
      state.product = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = LoadingStatus.FAILED;
      state.error = action.error.message || 'Failed to fetch product';
    });

    builder.addCase(editProduct.pending, (state) => {
      state.error = null;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      const updatedProduct = { ...state.product, ...action.payload };
      state.product = updatedProduct;
      state.error = null;
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
