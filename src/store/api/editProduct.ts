import { IEditData } from '@components/EditProduct';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '@shared/types/IProduct';

export const editProduct = createAsyncThunk<IProduct, IEditData>(
  'products/updateProduct',
  async (editData, thunkAPI) => {
    try {
      // const { id, title, description, price } = updateData;
      const response = await fetch(
        `https://6756d62cc0a427baf94a9a69.mockapi.io/product/${editData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message || `HTTP error! status: ${response.status}`;
        return thunkAPI.rejectWithValue(message);
      }

      const updatedProduct: IProduct = await response.json();
      return updatedProduct;
    } catch (error: any) {
      const message = error.message || 'Failed to update product';
      console.error('Error updating product:', message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
