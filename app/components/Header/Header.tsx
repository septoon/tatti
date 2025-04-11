'use client'
import React, { useState } from 'react'
import NavDesktop from './nav-desktop'
import NavMobile from './nav-mobile'
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className='w-full'>
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        <NavDesktop pathname={pathname} />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <NavMobile isOpen={isOpen} setIsOpen={setIsOpen} pathname={pathname} />
      </div>
    </div>
  )
}

export default Header