'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Form from '../Form/Form';

const Main = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className='relative w-full h-[calc(100vh-80px)] md:h-[calc(100vh-150px)]'> 
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/30 z-5 flex flex-col justify-center items-center'>
        <h1 className='text-3xl md:text-4xl text-white font-bold shadow-3xl text-center'>ДАРИМ СКИДКУ -10% <br></br>
        В ДЕНЬ РОЖДЕНИЯ!</h1>

        <button onClick={() => setIsFormOpen(true)} className='p-4 bg-amber-700 text-amber-50 shadow-lg font-bold rounded-sm mt-20 hover:bg-amber-800 transition-all cursor-pointer'>Хочу скидку!</button>
      </div>
      {isFormOpen && <Form onFormClose={() => setIsFormOpen(false)} />}
      <Image
        src='/images/main.webp'
        alt='Акция'
        layout="fill"
        objectFit="cover"
        
      />
    </div>
  )
}

export default Main