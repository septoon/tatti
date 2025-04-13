'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Form from '../Form/Form';
import { Dialog } from 'primereact/dialog';
import { handleShow, position } from '@/app/common/positions';

const Main = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

    const handleShowModal = () => {
      handleShow(setIsFormOpen)
    }
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
        <h1 className='text-5xl md:text-4xl text-white font-bold shadow-3xl text-center mb-4'>
          <b className=''>Кейтеринг</b>
        </h1>
        <h1 className='text-3xl md:text-4xl text-white font-bold shadow-3xl text-center'>с доставкой</h1>
        <h1 className='text-3xl md:text-4xl text-white font-bold shadow-3xl text-center'>по ЮБК</h1>
        <h1 className='text-3xl md:text-4xl text-white font-bold shadow-3xl text-center'>и Симферополю</h1>

        <button onClick={handleShowModal} className='p-4 bg-amber-700 text-amber-50 shadow-lg font-bold rounded-md mt-20 hover:bg-amber-800 transition-all cursor-pointer'>Рссчитать фуршет</button>
      </div>
      
      {isFormOpen && (
        <Dialog
          header="Заполните форму, и мы вам перезвоним!"
          blockScroll={true}
          visible={isFormOpen}
          position={position}
          style={{ width: '100vw', maxWidth: '512px', minHeight: '70vh', margin: 0 }}
          contentStyle={{ backgroundColor: '#151515' }}
          onHide={() => {
            if (!isFormOpen) return
            setIsFormOpen(false)
          }}
          draggable={false}
          resizable={false}
        ><Form onFormClose={() => setIsFormOpen(false)} />
          </Dialog>)}
    </section>
  )
}

export default Main