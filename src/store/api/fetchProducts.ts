import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (
    {
      page = 1,
      limit = 10,
      searchText = '',
      showLiked = false,
    }: { page: number; limit: number; searchText: string; showLiked: boolean },
    { rejectWithValue },
  ) => {
    try {
      let productsData;

      if (showLiked) {
        // Получаем массив ID из локального хранилища
        const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');

        // Проверяем, есть ли любимые продукты
        if (likedProducts.length === 0) {
          return { products: [], totalItems: 0 };
        }

        // Определяем количество продуктов, которые нужно получить
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        // Получаем id для текущей страницы
        const paginatedLikedProducts = likedProducts.slice(startIndex, endIndex);

        // Загружаем продукты по массиву ID
        const likedProductsResponse = await Promise.all(
          paginatedLikedProducts.map((id: number) =>
            fetch(`https://6756d62cc0a427baf94a9a69.mockapi.io/product/${id}`),
          ),
        );

        // Проверяем на ошибки
        for (let response of likedProductsResponse) {
          if (!response.ok) {
            throw new Error(`Error fetching product: ${response.status}`);
          }
        }

        // Получаем данные о продуктах
        productsData = await Promise.all(likedProductsResponse.map((response) => response.json()));

        // Возвращаем результаты с учетом пагинации
        return { products: productsData, totalItems: likedProducts.length };
      } else {
        const productsResponse = await fetch(
          `https://6756d62cc0a427baf94a9a69.mockapi.io/product?page=${page}&limit=${limit}&search=${searchText}`,
        );

        if (!productsResponse.ok) {
          throw new Error(`Error fetching products: ${productsResponse.status}`);
        }
        productsData = await productsResponse.json();

        const countResponse = await fetch(`https://6756d62cc0a427baf94a9a69.mockapi.io/product`);

        if (!countResponse.ok) {
          throw new Error(`Error fetching count: ${countResponse.status}`);
        }
        const totalItems = (await countResponse.json()).length;

        return { products: productsData, totalItems };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
