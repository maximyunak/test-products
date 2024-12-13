import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@shared/types/IProduct';
import { LoadingStatus } from '@shared/types/enums';
import { fetchProducts } from './api/fetchProducts';
import { deleteProduct } from './api/deleteProduct';

export interface ProductState {
  loading: LoadingStatus;
  error: string | null | undefined;
  products: IProduct[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  searchText: string;
  showLiked: boolean;
}

const initialState: ProductState = {
  loading: LoadingStatus.IDLE,
  error: null,
  products: [],
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0,
  searchText: '',
  showLiked: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setShowLiked(state, action: PayloadAction<boolean>) {
      state.showLiked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = LoadingStatus.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = LoadingStatus.SUCCEEDED;
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = LoadingStatus.FAILED;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = LoadingStatus.LOADING;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = LoadingStatus.SUCCEEDED;
        state.products = state.products.filter((product) => product.id !== action.payload);
        state.totalItems -= 1; // уменьшаем общее количество после удаления
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = LoadingStatus.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setSearchText, setShowLiked } = productsSlice.actions;

export default productsSlice.reducer;
