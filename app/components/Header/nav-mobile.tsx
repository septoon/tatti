import React from 'react'
import Logo from '@/public/logo.png'
import Image from 'next/image'
import Hamburger from 'hamburger-react'
import CartIcon from '../Cart/CartIcon';

interface NavMobileProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div className='fixed bg-[#1f1d1d] z-999 w-full flex justify-between items-center px-4 py-2 text-white'>
      <div className='z-50'>
        <Hamburger toggled={isOpen} toggle={() => setIsOpen(!isOpen)} rounded size={36} />
      </div>
      <a href="/" className='flex items-center'>
        <Image src={Logo} alt="Logo" width={60} style={{marginRight: 10}} />
        <h4 className='font-imFellDoublePica font-light italic text-[2rem]'>Tatti_shef</h4>
      </a>

      <CartIcon />
      
      {isOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-md z-55"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className={`fixed bg-[#151515] text-white top-0 bottom-0 right-[20%] left-0 transition-all duration-600 transform z-60 
        ${isOpen ? 'translate-x-0' : 'translate-x-[-100%]'}
        pl-6 pt-6 pb-10 flex flex-col justify-between overflow-y-auto`}>
        <div className=' flex flex-col items-start justify-between text-2xl'>
          <div className='flex items-center mb-10'>
            <Image src={Logo} alt="Logo" width={60} style={{marginRight: 10}} />
            <h4 className='font-imFellDoublePica font-bold italic text-[2rem]'>Tatti_shef</h4>
          </div>
          <a className='font-extralight mb-4' href="/">Главная</a>
          <a className='font-extralight mb-4' href="/menu">Фуршетное меню</a>
          <a className='font-extralight mb-4' href="/cakes">Торты и десерты</a>
          <a className='font-extralight mb-4' href="/services">Услуги</a>
          <a className='font-extralight mb-4' href="/delivery">Доставка</a>
          <a className='font-extralight mb-4' href="/contacts">Контакты</a>
        </div>
        <div>
          <p className='text-xl font-black'>г. Алушта, ул. Ленина, 13г</p>
          <a href="tel:+79785103520" className='text-2xl'>+7 (978) 510-35-20</a>
        </div>
      </div>
    </div>
  )
}

export default NavMobile