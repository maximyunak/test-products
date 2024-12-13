import { combineReducers, configureStore } from '@reduxjs/toolkit';
import someSlice from './someSlice';
import productsSlice from './productsSlice';
import newProductSlice from './newProductSlice';
import productSlice from './productSlice';

const rootReduser = combineReducers({});

export const setupStore = () => {
  return configureStore({
    reducer: {
      someSlice,
      productsSlice,
      newProductSlice,
      productSlice,
    },
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(authApi.middleware).concat(eventApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReduser>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
// export type AppDispatch = typeof store.dispatch;
