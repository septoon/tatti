'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/app/GlobalRedux/Features/cartSlice';
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';

type ServiceCartButtonProps = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

const ServiceCartButton = ({ id, name, price, image = '' }: ServiceCartButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isInCart = useSelector((state: RootState) => state.cart.items.some((item) => item.id === id));

  const handleAddToCart = () => {
    if (isInCart) return;

    dispatch(
      addToCart({
        id,
        name,
        price: Number(price),
        image,
      })
    );
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      aria-pressed={isInCart}
      className={`mt-5 w-full rounded-lg px-4 py-3 text-sm font-semibold text-white transition-colors ${
        isInCart
          ? 'cursor-default bg-[#6b4f32]'
          : 'cursor-pointer bg-green-600 hover:bg-green-700'
      }`}
    >
      {isInCart ? 'В корзине' : 'В корзину'}
    </button>
  );
};

export default ServiceCartButton;
