'use client'
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
<section className='relative max-w-[100vw] h-[100vh] shadow-[inset_0_-10px_15px_rgba(0,0,0,0.5)]'>

  {/* ==== ФОН ВИДЕО ==== */}
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    >
      <source src="/video/main.mp4" type="video/mp4" />
    </video>

    {/* затемнение поверх видео */}
    <div className="absolute inset-0 bg-black/25" />

    {/* градиент (как в Netflix) */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/40 to-black/80" />
  </div>

  {/* ==== Контент поверх ==== */}
  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 flex flex-col justify-center items-center'>

    <h1 className='text-5xl md:text-4xl text-white font-bold text-center mb-4 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]'>
      <b>Кейтеринг</b>
    </h1>

    <h1 className='text-3xl md:text-4xl text-white font-bold text-center drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]'>
      с доставкой
    </h1>
    <h1 className='text-3xl md:text-4xl text-white font-bold text-center drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]'>
      по ЮБК
    </h1>
    <h1 className='text-3xl md:text-4xl text-white font-bold text-center drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]'>
      и Симферополю
    </h1>

    <button 
      onClick={handleShowModal} 
      className='p-4 bg-amber-700 text-amber-50 font-bold rounded-md mt-20 cursor-pointer
                 hover:bg-amber-800 transition-all shadow-[0_8px_35px_rgba(255,0,0,0.4)]'
    >
      Рссчитать фуршет
    </button>
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
        if (!isFormOpen) return;
        setIsFormOpen(false);
      }}
      draggable={false}
      resizable={false}
    >
      <Form onFormClose={() => setIsFormOpen(false)} />
    </Dialog>
  )}
</section>

  )
}

export default Main;
