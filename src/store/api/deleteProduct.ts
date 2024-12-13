import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://6756d62cc0a427baf94a9a69.mockapi.io/product/${productId}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return productId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
