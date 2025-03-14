'use client'
import React, { useState } from 'react'
import NavDesktop from './nav-desktop'
import NavMobile from './nav-mobile'

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className='w-full'>
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        <NavDesktop />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <NavMobile isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  )
}

export default Header