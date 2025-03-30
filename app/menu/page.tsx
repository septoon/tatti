'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/GlobalRedux/store';
import Image from 'next/image';
import NotFoundImage from '/public/images/not_found.svg';
import { addToCart, removeOne } from '@/app/GlobalRedux/Features/cartSlice';
import { IoSearch } from "react-icons/io5";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string[];
  image: string;
};

const Menu = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Получаем меню и категории из Redux
  const { items: menu, categories } = useSelector(
    (state: RootState) => state.menu as { items: Record<string, MenuItem[]>; categories: string[] }
  );
  // Получаем товары корзины
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [category, setCategory] = useState<string>('');  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [noMatches, setNoMatches] = useState<boolean>(false);

  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories[0]);
    }
  }, [categories]);

  const filteredMenu = searchTerm
    ? Object.values(menu)
        .flat()
        .filter((item: MenuItem) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : menu[category] || [];

  useEffect(() => {
    setNoMatches(searchTerm !== '' && filteredMenu.length === 0);
  }, [searchTerm, filteredMenu]);

  return (
    <div className='flex-col justify-between min-h-[100vh] md:min-h-[100vh] pt-26 md:pt-40 text-white bg-[#151515]'>
      <div className='px-4'>
        <h1 className='mb-4 font-bold text-2xl md:hidden'>Фуршетное меню</h1>
        <div className='relative w-full mb-4'>
          <IoSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 text-xl' />
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Поиск по меню...'
            className='w-full p-2 pl-10 border-b border-gray-500 focus:border-0'
          />
        </div>
      </div>
      {/* Кнопки категорий */}
      <div className='w-full my-4 p-2 flex overflow-x-scroll sticky top-20 z-10 bg-[#151515]/80 backdrop-blur-md'>
        {categories.map((cat: string) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat)
              setSearchTerm('')
            }}
            className={`cursor-pointer ${
              category === cat ? ' text-red-400' : ' text-white'
            } font-semibold whitespace-nowrap rounded-md p-2 mr-2`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Список блюд по выбранной категории */}
      {
        noMatches && (
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <Image
              src={NotFoundImage}
              alt='Такого у нас нет'
              width={300}
              height={300}
              className='mb-4'
            />
            <span className=' text-2xl text-gray-400'>Не найдено</span>
          </div>
        )
      }
      <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 content-stretch pb-16'>
        {Array.isArray(filteredMenu) &&
          filteredMenu?.map((item: MenuItem, index: number) => {
            const cartItem = cartItems.find((ci) => ci.id === item.id);
            return (
              <div key={index} className='flex flex-col w-auto h-full mb-6 p-4 rounded-md'>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={350}
                  height={250}
                  className='object-cover w-full h-[250px] rounded-md'
                />
                <p className='mt-2 font-bold text-lg'>{item.name}</p>
                <div className='flex flex-col flex-grow'>
                  {item.description.map((desc: string, desIndex: number) => (
                    <p className='text-xs text-gray-500' key={desIndex}>
                      • {desc}
                    </p>
                  ))}
                </div>
                <div className='flex items-end justify-between mt-auto'>
                  <p className='text-bold text-xl'>{item.price} р</p>
                  {cartItem ? (
                    <div className='flex items-center bg-red-500 rounded-xl px-1'>
                      <button
                        onClick={() => dispatch(removeOne(item.id))}
                        className='px-4 py-2 text-white cursor-pointer'
                      >
                        -
                      </button>
                      <span className='mx-1.5 text-white font-pt-sans'>{cartItem.quantity}</span>
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
                        className='px-4 py-2 text-white cursor-pointer'
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
                            image: item.image,
                          })
                        )
                      }
                      className='bg-neutral-500 px-4 py-2 rounded-xl text-white cursor-pointer transition-transform'
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

export default Menu;