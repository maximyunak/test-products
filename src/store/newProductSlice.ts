import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createProduct } from './api/createProduct';

export interface IProductState {
  description: string;
  title: string;
  price: string | number | any;
  image: string;
  creatingProduct: boolean;
  createProductError: string | null;
  products: any[]; // Измените на корректный тип вашего массива продуктов
}

const initialState: IProductState = {
  description: '',
  title: '',
  price: '',
  image: '',
  creatingProduct: false,
  createProductError: null,
  products: [],
};

const newProductSlice = createSlice({
  name: 'newProduct', // Изменено имя, так как это slice для нового продукта, а не для всех продуктов
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setPrice(state, action: PayloadAction<any>) {
      state.price = action.payload;
    },
    setImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    resetNewProductForm(state) {
      // Редюсер для очистки формы
      state.title = '';
      state.description = '';
      state.price = '';
      state.image = '';
      state.createProductError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.creatingProduct = true;
        state.createProductError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.creatingProduct = false;
        state.products.push(action.payload); // Добавляем созданный продукт в массив products
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.creatingProduct = false;
        state.createProductError = action.payload as string;
      });
  },
});

export const { setTitle, setDescription, setPrice, setImage, resetNewProductForm } =
  newProductSlice.actions;
export default newProductSlice.reducer;
