import React from 'react'
import Logo from '@/public/logo.png'
import Image from 'next/image'
import CartIcon from '../Cart/CartIcon'

const NavDesktop = () => {
  return (
    <div className='fixed w-full flex justify-between px-6 py-4 text-white bg-[#1f1d1d] z-999'>
      <div className='flex items-center justify-between font-medium text-md'>
        <a className='mr-3' href="/menu">Меню</a>
        <a className='mr-3' href="/delivery">Доставка</a>
        <a className='mr-3' href="/about">О нас</a>
        <a className='mr-3' href="/contacts">Контакты</a>
      </div>

      <a href="/" className='flex items-center self-center'>
        <Image src={Logo} alt="Logo" width={50} style={{marginRight: 10}} />
        <h4 className='font-light italic text-xl md:text-3xl'>Tatti_shef</h4>
      </a>
      <div className=' flex items-center'>
        <p className='font-bold text-lg'>г. Алушта, ул. Ленина, 13</p>
        <div className='border p-2 rounded-sm border-white ml-4'>
          <a href="tel:+79785103520" className=' font-bold'>+7 (978) 510-35-20</a>
        </div>
        <CartIcon />
      </div>
    </div>
  )
}

export default NavDesktop