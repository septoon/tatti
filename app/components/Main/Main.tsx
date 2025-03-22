'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Form from '../Form/Form';

const Main = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <section className='relative w-full h-[100vh] bg-black/10 shadow-[inset_0_-10px_15px_rgba(0,0,0,0.5)]'>
      <div className='absolute top-0 left-0 right-0 bottom-0 z-5 flex flex-col justify-center items-center'>
        <h1 className='text-3xl md:text-4xl text-white font-bold shadow-3xl text-center'>ДАРИМ СКИДКУ -10% <br></br>
        В ДЕНЬ РОЖДЕНИЯ!</h1>

        <button onClick={() => setIsFormOpen(true)} className='p-4 bg-amber-700 text-amber-50 shadow-lg font-bold rounded-sm mt-20 hover:bg-amber-800 transition-all cursor-pointer'>Хочу скидку!</button>
      </div>
      {isFormOpen && <Form onFormClose={() => setIsFormOpen(false)} />}
    </section>
  )
}

export default Main