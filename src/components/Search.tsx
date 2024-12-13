import { useAppDispatch } from '@hooks';
import { setSearchText } from '@store/productsSlice';
import React, { ChangeEvent, useState } from 'react';

export const Search = () => {
  const [setsearchText, setSetsearchText] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
  };
  return (
    <div className="text- ">
      <input
        type="text"
        // className="bg-transparent border border-gray-500 py-1 px-3 rounded-lg"
        className="transition border-gray-600 placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 px-2.5 py-2 text-sm"
        onChange={(e) => handleChange(e)}
        placeholder="Search by title and description"
      />
    </div>
  );
};
