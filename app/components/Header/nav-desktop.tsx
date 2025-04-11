import React from 'react'
import Logo from '@/public/logo.png'
import Image from 'next/image'
import CartIcon from '../Cart/CartIcon'
import { navLinks } from '@/app/common/navLinks'

const NavDesktop = ({ pathname }: { pathname: string }) => {
  return (
    <div className='fixed w-full flex justify-between px-6 py-4 text-white md:text-xs bg-[#1f1d1d] z-999'>
      <div className='flex items-center justify-between font-medium text-md'>
        {navLinks.map(({ link, title }) => (
          <a
            key={link}
            href={link}
            className={`mr-4 transition-all duration-300 hover:text-red-300 ${
              pathname === link ? 'text-red-300' : ''
            }`}
          >
            {title}
          </a>
        ))}
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