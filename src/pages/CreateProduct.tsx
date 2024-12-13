import { useAppDispatch, useAppSelector } from '@hooks';
import { createProduct } from '@store/api';
import {
  resetNewProductForm,
  setDescription,
  setImage,
  setPrice,
  setTitle,
} from '@store/newProductSlice';
import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const CreateProduct = () => {
  const { title, description, price, image } = useAppSelector((state) => state.newProductSlice);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [titleError, setTitleError] = useState<boolean>(false);
  const [descError, setDescError] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    const value = e.target.value;
    switch (name) {
      case 'title':
        dispatch(setTitle(value));
        break;
      case 'desc':
        dispatch(setDescription(value));
        break;
      case 'price':
        // @ts-ignore
        if (/\d+/.test(Number(value))) {
          dispatch(setPrice(value));
        }
        break;
      default:
        break;
    }
  };

  // const isValidURL = (string: string): boolean => {
  //   try {
  //     new URL(string);
  //     return true;
  //   } catch (_) {
  //     return false;
  //   }
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    price <= 0 ? setPriceError(true) : setPriceError(false);
    title.length <= 0 ? setTitleError(true) : setTitleError(false);
    description.length <= 0 ? setDescError(true) : setDescError(false);
    // image.length <= 0 ? setImageError(true) : setImageError(false);

    // isValidURL(image) ? console.log(true) : setImageUrlError(true);

    if (price >= 0 && title.length >= 0 && description.length > 0) {
      dispatch(createProduct({ title, description, image, price }));
      console.log('Product created:', { title, description, price, image });

      dispatch(resetNewProductForm());
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center item-center fixed top-1/2 right-1/2 translate w-full">
      <div className="w-full rounded-xl bg-[#fbffdc] shadow-xl sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl">
            Add New Product
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block mb-2 text-base font-semibold">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => handleChange(e, 'title')}
                className="text-white transition bg-gray-600 border-gray-600 placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm"
                placeholder="Enter a product title"
              />
              {titleError && (
                <span className="absolute text-sm text-red-600">
                  Title length must be greater than 0
                </span>
              )}
            </div>
            <div>
              <label htmlFor="description" className="block mb-2 text-base font-semibold">
                Product Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(e) => handleChange(e, 'desc')}
                placeholder="Enter a product description"
                className="text-white transition bg-gray-600 border-gray-600 placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm"
              />
              {descError && (
                <span className="absolute text-sm text-red-600">
                  Description length must be greater than 0
                </span>
              )}
            </div>
            <div>
              <label htmlFor="price" className="block mb-2 text-base font-semibold">
                Price
              </label>
              <input
                type="text"
                name="price"
                id="price"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => handleChange(e, 'price')}
                // onChange={(e) => onChange(e)}
                placeholder="Enter a product price"
                className="text-white transition bg-gray-600 border-gray-600 placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm"
              />
              {priceError && (
                <span className="absolute text-sm text-red-600">
                  Price must be a number greater than or equal to 0
                </span>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <Link
                to="/"
                className="bg-white flex items-center justify-center w-16 rounded-lg hover:opacity-60 transition"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path>
                </svg>
              </Link>
              <button
                type="submit"
                className="duration-200 w-full bg-[#007878] hover:bg-[#016363] font-semibold rounded-lg text-base px-5 py-2.5 text-center text-white"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
