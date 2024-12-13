// import { ProductList } from '@components/ProductList';
// import { useAppDispatch, useAppSelector } from '@hooks';
// import React, { useEffect } from 'react';

import { AddProduct } from '@components/AddProduct';
import { Filter } from '@components/Filter';
import { Pagination } from '@components/Pagination';
import { Product } from '@components/Product';
import { Search } from '@components/Search';
import { useAppDispatch, useAppSelector } from '@hooks';
import { IProduct } from '@shared/types/IProduct';
import { LoadingStatus } from '@shared/types/enums';
import { fetchProducts } from '@store/api';
import { setCurrentPage } from '@store/productsSlice';
import { useEffect } from 'react';

export const Products = () => {
  const { loading, products, error, currentPage, itemsPerPage, totalItems, searchText, showLiked } =
    useAppSelector((state) => state.productsSlice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchProducts({ page: currentPage, limit: itemsPerPage, searchText: searchText, showLiked }),
    );
  }, [dispatch, searchText, currentPage, totalItems, showLiked]);

  const handleSetPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const totalPages = totalItems / itemsPerPage;

  console.log(totalItems);

  return (
    <div>
      <div className="flex gap-3 items-center">
        <Search />
        <Filter />
      </div>
      {/* <div className="flex  flex-wrap justify-between align-center"> */}
      <div className="grid grid-cols-1 min-[550px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4">
        {loading === LoadingStatus.LOADING ? (
          <div>Loading...</div>
        ) : loading === LoadingStatus.SUCCEEDED ? (
          products.map((product: IProduct) => (
            <Product key={`${product.id}-${product.title}`} product={product} />
          ))
        ) : (
          <div>Nothing found</div>
        )}
      </div>
      <div className="flex justify-center mt-10">
        {totalPages > 1 && (
          <Pagination setPage={handleSetPage} currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
      <AddProduct />
    </div>
  );
};
