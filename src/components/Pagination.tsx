import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';

interface IPaginationProps {
  setPage: (n: number) => void;
  currentPage: number;
  totalPages: number;
}

export const Pagination: FC<IPaginationProps> = ({ setPage, currentPage, totalPages }) => {
  return (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={''}
      pageCount={totalPages}
      marginPagesDisplayed={0}
      pageRangeDisplayed={3}
      onPageChange={({ selected }) => setPage(selected + 1)}
      containerClassName={'pagination'}
      activeClassName={'active'}
      forcePage={currentPage - 1}
    />
  );
};
