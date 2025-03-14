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
    <div className='w-full flex justify-between items-center p-4'>
      <div className='flex items-center'>
        <Image src={Logo} alt="Logo" width={70} style={{marginRight: 10}} />
        <span className='font-imFellDoublePica font-bold italic text-[2.5rem]'>Tatti_shef</span>
      </div>
      <div className='z-99'>
        <Hamburger toggled={isOpen} toggle={() => setIsOpen(!isOpen)} rounded size={40} />
      </div>
      {isOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-md z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className={`fixed bg-white top-0 bottom-0 right-[20%] left-0 transition-all duration-600 transform z-20 
        ${isOpen ? 'translate-x-0' : 'translate-x-[-100%]'}
        pl-6 py-16 flex flex-col justify-between`}>
        <div className='h-[20%] flex flex-col items-start justify-between font-semibold text-xl'>
          <a href="">Меню</a>
          <a href="">Акции</a>
          <a href="/about">О нас</a>
          <a href="">Контакты</a>
        </div>
        <div>
          <p className='text-4xl font-black opacity-50'>Алушта</p>
          <a href="tel:+79785103520" className='text-2xl'>+7 (978) 510-35-20</a>
        </div>
      </div>
    </div>
  )
}

export default NavMobile