import React from 'react'
import Logo from '@/public/logo.png'
import Image from 'next/image'
import Hamburger from 'hamburger-react'

interface NavMobileProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div className='w-full flex justify-between items-center p-4 bg-black/10 text-white'>
      <a href="/" className='flex items-center'>
        <Image src={Logo} alt="Logo" width={60} style={{marginRight: 10}} />
        <h4 className='font-imFellDoublePica font-light italic text-[2rem]'>Tatti_shef</h4>
      </a>
      <div className='z-50'>
        <Hamburger toggled={isOpen} toggle={() => setIsOpen(!isOpen)} rounded size={36} />
      </div>
      {isOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-md z-55"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className={`fixed bg-white text-black top-0 bottom-0 right-[20%] left-0 transition-all duration-600 transform z-60 
        ${isOpen ? 'translate-x-0' : 'translate-x-[-100%]'}
        pl-6 pt-6 pb-10 flex flex-col justify-between overflow-y-auto`}>
        <div className='h-[45%] flex flex-col items-start justify-between text-3xl'>
          <div className='flex items-center mb-10'>
            <Image src={Logo} alt="Logo" width={60} style={{marginRight: 10}} />
            <h4 className='font-imFellDoublePica font-bold italic text-[2rem]'>Tatti_shef</h4>
          </div>
          <a href="/menu">Меню</a>
          <a href="/delivery">Доставка</a>
          <a href="/about">О нас</a>
          <a href="/contacts">Контакты</a>
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