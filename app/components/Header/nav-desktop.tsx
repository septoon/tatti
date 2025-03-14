import React from 'react'
import Logo from '@/public/logo.png'
import Image from 'next/image'

const NavDesktop = () => {
  return (
    <>
      <div className='w-full flex items-center justify-between p-6'>
        <div className='flex items-center'>
          <Image src={Logo} alt="Logo" width={50} style={{marginRight: 10}} />
          <span className='font-imFellDoublePica font-bold italic text-xl md:text-3xl'>Tatti_shef</span>
        </div>
        <div className='text-red-500 flex items-center'>
          <p className='font-bold text-lg'>г. Алушта, ул. Ленина, 13</p>
          <div className='border p-2 rounded-sm border-red-500 ml-4'>
            <a href="tel:+79785103520" className=' font-bold'>+7 (978) 510-35-20</a>
          </div>
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
    </>
  )
}

export default NavDesktop