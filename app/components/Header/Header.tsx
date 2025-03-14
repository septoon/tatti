import React from 'react'
import Logo from '@/public/logo.png'
import Image from 'next/image'

const Header = () => {
  return (
    <div className='w-full'>
      <div className='w-full flex items-center justify-between p-6'>
        <div className='flex items-center'>
          <Image src={Logo} alt="Logo" width={50} style={{marginRight: 10}} />
          <span className='font-imFellDoublePica font-bold italic text-xl md:text-3xl'>Tatti_shef</span>
        </div>
        <div className='border p-2 rounded-sm border-red-500'>
          <a href="tel:+79785103520" className='text-red-500 font-bold'>+7 (978) 510-35-20</a>
        </div>
      </div>

      <div className='w-full flex justify-center py-2 mt-4'>
        <div className='w-[40%] flex items-center justify-between font-semibold text-xl'>
          <a href="">Меню</a>
          <a href="">Акции</a>
          <a href="/about">О нас</a>
          <a href="">Контакты</a>
        </div>
      </div>
    </div>
  )
}

export default Header