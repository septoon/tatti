'use client';

import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/GlobalRedux/store';
import { addToCart, removeOne } from '../GlobalRedux/Features/cartSlice';
import Loader from '../components/Loader/Loader';

type EasterItem = {
  id: number;
  name: string;
  price?: number;
  weight?: number;
  description?: string[];
  image?: string;
  images?: string[];
  weights?: {
    weight: number;
    price: number;
  }[];
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type SelectedWeightMap = { [productId: number]: number };
const Easter: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [easterData, setEasterData] = useState<EasterItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedWeight, setSelectedWeight] = useState<SelectedWeightMap>({});

  useEffect(() => {
    const fetchEaster = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/easter.json`);
        if (!res.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        const data = await res.json();
        const easterArray: EasterItem[] = Array.isArray(data) ? data : Object.values(data);
        setEasterData(easterArray);

        const initialWeights: { [key: number]: number } = {};
        easterArray.forEach(item => {
          const weights = item.weights || (
            item.name.toLowerCase().includes('кулич') && item.price == null
              ? [
                  { weight: 130, price: 260 },
                  { weight: 300, price: 430 },
                  { weight: 400, price: 560 },
                  { weight: 700, price: 860 },
                ]
              : []
          );
          if (weights.length > 0) {
            initialWeights[item.id] = weights[0].weight;
          } else if (item.weight) {
            initialWeights[item.id] = item.weight;
          }
        });
        setSelectedWeight(initialWeights);
      } catch (err: any) {
        setError(err.message || 'Ошибка');
      } finally {
        setLoading(false);
      }
    };
    fetchEaster();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="flex-col justify-between min-h-[100vh] pt-26 md:pt-40 text-white bg-[#151515]">
      <div className="px-4">
        <h1 className="mb-4 font-bold text-2xl md:hidden">Пасхальное меню</h1>
        <h3 className="mb-4 font-normal text-xl text-red-400">Заказы принимаем до 16.04</h3>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 content-stretch pb-16">
        {easterData.map((item) => {
          const cartItem = cartItems.find((ci) => ci.id === item.id);
          const image = Array.isArray(item.images) ? item.images[0] : item.image ?? '';

          const availableWeights =
            item.name.toLowerCase().includes('кулич') && item.price == null
              ? [
                  { weight: 130, price: 260 },
                  { weight: 300, price: 430 },
                  { weight: 400, price: 560 },
                  { weight: 700, price: 860 },
                ]
              : item.weights || [];

          const defaultWeight = availableWeights.length > 0 ? availableWeights[0].weight : item.weight ?? 0;
          const selectedPrice =
            selectedWeight[item.id] !== undefined
              ? availableWeights.find(w => w.weight === selectedWeight[item.id])?.price ?? item.price ?? 0
              : item.price ?? (availableWeights.length > 0 ? availableWeights[0].price : 0);

          return (
            <div key={item.id} className="flex flex-col w-auto h-full mb-6 p-4 rounded-md">
              <div className="w-full h-[300px] overflow-hidden rounded-md bg-gray-900 flex items-center justify-center">
                {image && <img src={image} alt={item.name} className="object-cover w-full h-full" />}
              </div>
              <p className="my-4 font-bold text-lg uppercase">{item.name}</p>
              <div className="flex flex-col flex-grow">
                {item.description?.map((desc, idx) => (
                  <p className="text-xs text-gray-500" key={idx}>• {desc}</p>
                ))}
              </div>
              <div className='w-full flex items-center justify-between mb-4'>
                {availableWeights.length > 0 && (
                    <div className="flex gap-2">
                      {availableWeights.map((w) => (
                        <button
                          key={w.weight}
                          onClick={() =>
                            setSelectedWeight((prev) => ({
                              ...prev,
                              [item.id]: w.weight,
                            }))
                          }
                          className={`px-2 py-1 rounded-md text-sm transition-all duration-300 ${
                            selectedWeight[item.id] === w.weight
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          {w.weight} г
                        </button>
                      ))}
                    </div>
                  )}
              </div>
              <div className="flex items-end justify-between mt-auto">
                <p className="text-bold text-xl mr-4 transition-all duration-300">{selectedPrice} р</p>
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
                            price: selectedPrice,
                            image,
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
                          price: selectedPrice,
                          image,
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

export default Easter;