'use client'
import React from 'react'
import { pp } from '@/app/api/pp'
import { div, p } from 'framer-motion/client'
import Image from 'next/image'

const Menu = () => {
  return (
    <div className='px-4 flex-col justify-between mt-8'>
      {
        pp.map((item, index) => (
          <div key={index} className='flex flex-col w-full mb-6 p-4 border border-red-500 rounded-md'>
            <Image src={item.image} alt={item.name} width={350} height={100} />
            <p className='mt-2 font-bold text-lg'>{item.name}</p>
            <div className='flex flex-col'>
              {
                item.description.map((i, desIndex) => (
                  <p className='text-xs text-gray-500' key={desIndex}>• {i}</p>
                ))
              }
            </div>
            <div className='flex items-center justify-between mt-4'>
              <p className='text-bold text-xl'>{item.price}</p>
              <button className='bg-neutral-500 p-3 rounded-md text-white'>Добавить</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Menu