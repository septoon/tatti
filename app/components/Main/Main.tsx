'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Form from '../Form/Form';

const Main = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <section className='relative w-full h-[100vh] bg-black/40 shadow-[inset_0_-10px_15px_rgba(0,0,0,0.5)]'>
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/main.webp"
          alt="Фон"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className='absolute top-0 left-0 right-0 bottom-0 z-5 flex flex-col justify-center items-center'>
        <h1 className='text-3xl md:text-4xl text-white font-bold shadow-3xl text-center'>
          Кейтеринг<br></br> с доставкой <br></br> 
          <b className='text-4xl md:text-5xl'>по ЮБК<br></br>и Симферополю</b>
         </h1>

        <button onClick={() => setIsFormOpen(true)} className='p-4 bg-amber-700 text-amber-50 shadow-lg font-bold rounded-md mt-20 hover:bg-amber-800 transition-all cursor-pointer'>Рссчитать фуршет</button>
      </div>
      {isFormOpen && <Form onFormClose={() => setIsFormOpen(false)} />}
    </section>
  )
}

export default Main