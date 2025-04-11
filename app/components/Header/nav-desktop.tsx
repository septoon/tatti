import React from 'react'
import Logo from '@/public/logo.png'
import Image from 'next/image'
import CartIcon from '../Cart/CartIcon'

const NavDesktop = () => {
  return (
    <div className='fixed w-full flex justify-between px-6 py-4 text-white bg-[#1f1d1d] z-999'>
      <div className='flex items-center justify-between font-medium text-md'>
        <a className='mr-4 hover:text-red-300 transition-all duration-300' href="/menu">Фуршетное меню</a>
        <a className='mr-4 hover:text-red-300 transition-all duration-300' href="/easter">Пасхальное меню</a>
        <a className='mr-4 hover:text-red-300 transition-all duration-300' href="/cakes">Торты и десерты</a>
        <a className='mr-4 hover:text-red-300 transition-all duration-300' href="/services">Услуги</a>
        <a className='mr-4 hover:text-red-300 transition-all duration-300' href="/delivery">Доставка</a>
        <a className='mr-4 hover:text-red-300 transition-all duration-300' href="/contacts">Контакты</a>
      </div>

      <a href="/" className='flex items-center self-center hide-between-md-lg'>
        <Image src={Logo} alt="Logo" width={50} style={{marginRight: 10}} />
        <h4 className='font-light italic text-xl md:text-3xl'>Tatti_shef</h4>
      </a>
      
      <div className=' flex items-center'>
        <p className='font-bold text-lg small-between-md-lg large-header-info'>г. Алушта, ул. Ленина, 13г</p>
        <div className='border p-2 rounded-sm border-white ml-4 large-header-info'>
          <a href="tel:+79785103520" className='font-bold'>+7 (978) 510-35-20</a>
        </div>
        <CartIcon />
      </div>
    </div>
  )
}

export default NavDesktop