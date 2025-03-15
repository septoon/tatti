'use client'
import React, { useState } from 'react'
import { menu } from '@/app/api/menu';
import Image from 'next/image'

const Menu = () => {
  const [category, setCategory] = useState<string>(Object.keys(menu)[0]);

  return (
    <div className='px-4 flex-col justify-between mt-8'>
      <h1 className='my-4 font-bold text-4xl opacity-50 md:hidden' >Меню</h1>
      <div className='w-full my-4 py-4 flex overflow-x-scroll'>
        {
          Object.keys(menu).map((i) => (
            <button 
              onClick={() => setCategory(i)}
              className={`border ${category === i ? 'border-red-500 bg-red-400 text-white' : 'border-red-400 text-red-400'} font-semibold whitespace-nowrap rounded-md p-2 mr-2`}
            >
              {i}
            </button>
          ))
        }
      </div>
      <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
        {
          menu[category].map((item: any, index: number) => (
            <div key={index} className='flex flex-col w-full mb-6 p-4 border border-red-500 rounded-md'>
              <Image 
                src={item.image} 
                alt={item.name} 
                width={350} 
                height={250} 
                className="object-cover w-[350px] h-[250px] rounded-md"
              />
              <p className='mt-2 font-bold text-lg'>{item.name}</p>
              <div className='flex flex-col'>
                {
                  item.description.map((i: any, desIndex: number) => (
                    <p className='text-xs text-gray-500' key={desIndex}>• {i}</p>
                  ))
                }
              </div>
              <div className='flex items-center justify-between mt-4'>
                <p className='text-bold text-xl'>{item.price} р</p>
                <button className='bg-neutral-500 p-3 rounded-md text-white'>Добавить</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Menu