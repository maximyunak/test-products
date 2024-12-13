import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchProducts } from '@store/productsSlice';
import React, { useEffect } from 'react';

export const useFetchProducts = () => {
  const { products, currentPage, itemsPerPage, searchText } = useAppSelector(
    (state) => state.productSlice,
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: itemsPerPage, searchText }));
  }, [dispatch, currentPage, itemsPerPage, searchText]);

  return products;
};
