import { EditProduct } from "@components/EditProduct";
import { useAppDispatch, useAppSelector } from "@hooks";
import { IProduct } from "@shared/types/IProduct";
import { fetchProductById } from "@store/api/fetchProductById";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Product = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product, loading } = useAppSelector((state) => state.productSlice);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      <div className="mb-4">
        {isEdit && id && <EditProduct id={id} setIsEdit={setIsEdit} />}

        {product ? (
          <div>
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRKD78uVcymQ8c3JsiARmnFDxVvP49odCOhQ&s"
              alt=""
              className="my-2 max-w-[500px] w-full"
            />
            <h2 className="max-w-[500px] mt-2">{product.description}</h2>
            <h2 className="mt-2 text-amber-700">
              <span className="italic">$</span>
              {product.price}
            </h2>
          </div>
        ) : loading === "loading" ? (
          <div>loading...</div>
        ) : (
          <div>Product with this ID was not found</div>
        )}
      </div>
      <div className="flex gap-2">
        <Link
          to="/"
          className="bg-slate-600 py-1 px-3 rounded-lg hover:opacity-80 transition"
        >
          <span className="text-white text-base">Back to home</span>
        </Link>

        <button
          className="bg-slate-600 p-2 rounded-lg hover:opacity-80 transition"
          onClick={handleEdit}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white z-10"
          >
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
          </svg>
        </button>
      </div>
    </>
  );
};
