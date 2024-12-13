import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '@shared/types/IProduct';

interface CreateProductArgs {
  title?: string;
  image?: string;
  price?: number;
  description?: string;
}

export const createProduct = createAsyncThunk<IProduct, CreateProductArgs>(
  'products/createProduct',
  async (newProduct: CreateProductArgs, { rejectWithValue }) => {
    try {
      const response = await fetch('https://6756d62cc0a427baf94a9a69.mockapi.io/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Попытка получить данные об ошибке из ответа
        const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
        return rejectWithValue(errorMessage);
      }

      const createdProduct = await response.json();
      return createdProduct as IProduct; // Приведение к IProduct, предполагая, что API возвращает объект IProduct
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
