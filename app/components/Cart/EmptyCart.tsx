import Image from 'next/image'
import React from 'react'
import EmptyCartImg from "@/public/images/empty_cart.webp";

const EmptyCart = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <Image
        src={EmptyCartImg}
        alt='Такого у нас нет'
        width={300}
        height={300}
        className='mb-4'
      />
      <span className=' text-2xl text-red-400'>Пока тут пусто</span>
    </div>
  )
}

export default EmptyCart