import { useAppDispatch, useAppSelector } from '@hooks';
import { setShowLiked } from '@store/productsSlice';
import React, { useEffect, useRef, useState } from 'react';

export const Filter = () => {
  const dispatch = useAppDispatch();
  const { showLiked } = useAppSelector((state) => state.productsSlice);
  const [isOpen, setIsOpen] = useState(false); // Добавляем состояние для открытия дропдауна

  const handleShowLiked = () => {
    dispatch(setShowLiked(!showLiked));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (filterRef.current && !e.composedPath().includes(filterRef.current)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('click', handleClick);
    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="relative inline-block text-left z-20 w-[150px]">
      <div
        ref={filterRef}
        onClick={toggleDropdown}
        className={`transition inline-flex justify-between w-full cursor-pointer rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 ${
          isOpen ? 'border-blue-500' : ''
        }`}
      >
        Filter
        <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute w-full mt-2 text-left">
          <div
            onClick={handleShowLiked}
            className={`${
              showLiked && 'text-red-700'
            } px-4 py-2 bg-white rounded-md text-sm cursor-pointer`}
          >
            Show only liked
          </div>
        </div>
      )}
    </div>
  );
};
