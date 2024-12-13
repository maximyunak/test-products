import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '@shared/types/IProduct';

export const fetchProductById = createAsyncThunk<IProduct, any>(
  'products/fetchProductById',
  async (id) => {
    try {
      const response = await fetch(`https://6756d62cc0a427baf94a9a69.mockapi.io/product/${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const product: IProduct = await response.json();

      return product;
    } catch (error: any) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },
);
