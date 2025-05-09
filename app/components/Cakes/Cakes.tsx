'use client';

import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/GlobalRedux/store';
import { addToCart, removeOne } from '../../GlobalRedux/Features/cartSlice';
import ParallaxCarousel from '../Carousel/ParallaxCarousel';
import Loader from '../Loader/Loader';

type CakeItem = {
  id: number;
  name: string;
  price: number;
  description: string[];
  image?: string;
  images?: string[];
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const Cakes: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [cakesData, setCakesData] = useState<CakeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cakes.json`);
        if (!res.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        const data = await res.json();
        const cakesArray: CakeItem[] = Array.isArray(data) ? data : Object.values(data);
        setCakesData(cakesArray);
      } catch (err: any) {
        setError(err.message || 'Ошибка');
      } finally {
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="flex-col justify-between min-h-[100vh] md:min-h-[100vh] pt-26 md:pt-40 text-white bg-[#151515]">
      <div className="px-4">
        <h1 className="mb-4 font-bold text-2xl md:hidden">Торты и десерты</h1>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 content-stretch pb-16">
        {cakesData.map((item: CakeItem, index: number) => {
          const cartItem: CartItem | undefined = cartItems.find((ci: CartItem) => ci.id === item.id);
          return (
            <div key={index} className="flex flex-col w-auto h-full mb-6 p-4 rounded-md">
              <div className="w-full h-[300px] overflow-hidden">
                <ParallaxCarousel images={item.images ?? (item.image ? [item.image] : [])} />
              </div>
              <p className="mt-2 font-bold text-lg uppercase">{item.name}</p>
              <div className="flex flex-col flex-grow">
                {(Array.isArray(item.description) ? item.description : []).map((desc, desIndex) => (
                  <p className="text-xs text-gray-500" key={desIndex}>
                    • {desc}
                  </p>
                ))}
              </div>
              <div className="flex items-end justify-between mt-auto">
                <p className="text-bold text-xl">{`${item.price} р`}</p>
                {cartItem ? (
                  <div className="flex items-center bg-red-500 rounded-lg px-1">
                    <button
                      onClick={() => dispatch(removeOne(item.id))}
                      className="px-4 py-2 text-white cursor-pointer"
                    >
                      -
                    </button>
                    <span className="mx-1.5 text-white font-pt-sans">{cartItem.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image ?? '',
                          })
                        )
                      }
                      className="px-4 py-2 text-white cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: Array.isArray(item.images) ? item.images[0] : item.image ?? '',
                        })
                      )
                    }
                    className="bg-green-600 px-4 py-2 rounded-lg text-white cursor-pointer"
                  >
                    В корзину
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cakes;