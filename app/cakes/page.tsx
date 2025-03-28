'use client'

import React from 'react'
import { cakes } from '../api/cakes'

type CakeItem = {
  id: number;
  name: string;
  price: string;
  description?: string[];
  image?: string;
  images?: string[];
};

type CartItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeOne } from '../GlobalRedux/Features/cartSlice';
import ParallaxCarousel from '../components/Carousel/ParallaxCarousel';

const Cakes = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();
  return (
    <div className='flex-col justify-between min-h-[100vh] md:min-h-[100vh] pt-26 md:pt-40 text-white bg-[#151515]'>
      <div className='px-4'>
        <h1 className='mb-4 font-bold text-2xl md:hidden'>Торты</h1>
      </div>
      <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 content-stretch pb-16'>
        {
          Object.values(cakes).map((item: CakeItem, index: number) => {
            const cartItem: CartItem | undefined = cartItems.find((ci) => ci.id === item.id);
            return (
              <div key={index} className='flex flex-col w-auto h-full mb-6 p-4 rounded-md'>
                <div className="w-full h-[300px] overflow-hidden">
                  <ParallaxCarousel images={item.images ?? (item.image ? [item.image] : [])} />
                </div>
                <p className='mt-2 font-bold text-lg'>{item.name}</p>
                <div className='flex flex-col flex-grow'>
                  {item.description?.map((desc: string, desIndex: number) => (
                    <p className='text-xs text-gray-500' key={desIndex}>
                      • {desc}
                    </p>
                  ))}
                </div>
                <div className='flex items-end justify-between mt-auto'>
                  <p className='text-bold text-xl'>{item.price} р/кг</p>
                  {cartItem ? (
                    <div className='flex items-center bg-red-500 rounded-md px-1'>
                      <button
                        onClick={() => dispatch(removeOne(item.id))}
                        className=' p-3 text-white cursor-pointer'
                      >
                        -
                      </button>
                      <span className='mx-2 text-white font-pt-sans'>{cartItem.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            addToCart({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                            })
                          )
                        }
                        className='p-3 text-white cursor-pointer'
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
                            image: Array.isArray(item.images) ? item.images[0] : item.image || '',
                          })
                        )
                      }
                      className='bg-neutral-500 p-3 rounded-md text-white cursor-pointer'
                    >
                      Добавить
                    </button>
                  )}
                </div>
              </div>
            );
        })}
      </div>
    </div>
  )
}

export default Cakes