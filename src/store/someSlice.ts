import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITest {
  work: boolean;
}

const initialState: ITest = {
  work: true,
};

// Создание slice
const someSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<boolean>) {
      state.work = action.payload;
    },
  },
});

export const { changeTheme } = someSlice.actions;

// Экспорт reducer
export default someSlice.reducer;
