import { useAppDispatch } from '@hooks';
import { editProduct } from '@store/api/editProduct';
import React, { ChangeEvent, FC, useState } from 'react';
import { Link } from 'react-router-dom';

interface IEditProduct {
  id: string;
  setIsEdit: (b: boolean) => void;
}
export interface IEditData {
  id: string;
  title?: string;
  description?: string;
  price?: number;
}

export const EditProduct: FC<IEditProduct> = ({ id, setIsEdit }) => {
  const [newPrice, setNewPrice] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDesc, setNewDesc] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    const value = e.target.value;
    switch (name) {
      case 'title':
        setNewTitle(value);
        break;
      case 'desc':
        setNewDesc(value);
        break;
      case 'price':
        // @ts-ignore
        if (/\d+/.test(Number(value))) {
          setNewPrice(value);
        }
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setIsEdit(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editData: IEditData = { id };
    if (newTitle.trim() !== '') {
      editData['title'] = newTitle;
    }
    if (newDesc.trim() !== '') {
      editData['description'] = newDesc;
    }
    if (newPrice.trim() !== '') {
      const priceNum = parseFloat(newPrice);
      if (!isNaN(priceNum)) {
        editData['price'] = priceNum;
      } else {
        return;
      }
    }
    dispatch(editProduct(editData));
    console.log(editData);

    handleClose();
  };

  return (
    <div className="fixed w-screen h-screen left-0 top-0 bg-[#282828] bg-opacity-15">
      <div className="max-w-[500px] absolute w-full top-1/2 right-1/2 translate">
        <div className="w-full rounded-xl bg-[#f1f1f1] shadow-xl sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl">
              Edit Product
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
                  value={newTitle}
                  onChange={(e) => handleChange(e, 'title')}
                  className="text-white transition bg-gray-600 border-gray-600 placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm"
                  placeholder="Enter a product title"
                />
              </div>
              <div>
                <label htmlFor="description" className="block mb-2 text-base font-semibold">
                  Product Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={newDesc}
                  onChange={(e) => handleChange(e, 'desc')}
                  placeholder="Enter a product description"
                  className="text-white transition bg-gray-600 border-gray-600 placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm"
                />
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
                  value={newPrice}
                  onChange={(e) => handleChange(e, 'price')}
                  placeholder="Enter a product price"
                  className="text-white transition bg-gray-600 border-gray-600 placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleClose}
                  className="bg-white flex text-2xl items-center justify-center w-16 rounded-lg hover:opacity-60 transition"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="M7,7 L17,17 M7,17 L17,7"
                    ></path>
                  </svg>
                </button>
                <button
                  type="submit"
                  className="transition w-full bg-[#007878] hover:bg-[#016363] font-semibold rounded-lg text-base px-5 py-2.5 text-center text-white"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
