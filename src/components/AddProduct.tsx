import React from 'react';
import { Link } from 'react-router-dom';

export const AddProduct = () => {
  return (
    <Link
      to="/create-product"
      className="w-10 h-10 fixed bottom-10 right-10 bg-white border border-black border-opacity-80 rounded-full flex justify-center items-center text-black cursor-pointer hover:opacity-80 transition"
    >
      <span className="-mt-1">+</span>
    </Link>
  );
};
