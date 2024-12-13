import { useAppDispatch, useAppSelector } from '@hooks';
import { IProduct } from '@shared/types/IProduct';
import { deleteProduct } from '@store/api';
import { FC, useState, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

interface ProductProps {
  product: IProduct;
}

export const Product: FC<ProductProps> = ({ product }) => {
  console.log(product.image);

  const dispatch = useAppDispatch();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
    setLiked(likedProducts.includes(product.id));
  }, [product.id]);

  const handleDelete = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();
    dispatch(deleteProduct(product.id));

    const updatedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]').filter(
      (prodId: number) => prodId !== product.id,
    );
    localStorage.setItem('likedProducts', JSON.stringify(updatedProducts));
  };

  const handleLike = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();

    let likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');

    if (liked) {
      likedProducts = likedProducts.filter((id: number) => id !== product.id);
    } else {
      likedProducts.push(product.id);
    }
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
    setLiked(!liked);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <div className="border-2 border-gray-300 p-4 h-[291px]">
        <div className="">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRKD78uVcymQ8c3JsiARmnFDxVvP49odCOhQ&s"
            alt=""
            className="w-[100%]"
          />
        </div>

        <h1 className="mt-2 font-medium">{product.title}</h1>

        <div className="mt-2 flex justify-between items-center">
          <h2 className=" text-amber-700">
            <span className="italic">$</span>
            {product.price}
          </h2>
          <div className="flex gap-2">
            <svg
              className={`hover:opacity-80 ${liked ? 'fill-red-500' : ''} transition`} // Условное применение цвета
              onClick={handleLike}
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z"></path>
            </svg>

            <svg
              className="hover:opacity-80 transition"
              onClick={handleDelete}
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};
