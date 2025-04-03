'use client'
import React, { useState } from 'react'
import ParallaxCarouselReviews from '../Carousel/ParallaxCarouselReviews'
import reviews from '@/app/api/reviews.json'
import { Dialog } from 'primereact/dialog'
import { position, handleShow } from '@/app/common/positions';
import ReviewForm from './ReviewForm'

const Reviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const handleShowModal = () => {
      handleShow(setIsModalOpen);
    };
  return (
    <div className='bg-[#130E0C] mx-auto px-6 pt-12 pb-8 min-h-[190px]'>
      <h1 className='text-5xl text-orange-500 opacity-55 mb-12 font-black'>Отзывы</h1>

      <ParallaxCarouselReviews reviews={reviews} />
      <button className='text-orange-300 mt-8 border rounded-2xl px-4 py-2' 
        onClick={handleShowModal}>Оставить отзыв</button>
      {isModalOpen && (
        <Dialog header="Оставить отзыв" blockScroll={true} 
          visible={isModalOpen} position={position} 
          style={{ width: '100vw', maxWidth: '512px', minHeight: '90vh', margin: 0 }} 
          contentStyle={{ backgroundColor: '#151515' }}
          onHide={() => {if (!isModalOpen) return; setIsModalOpen(false); }} 
          draggable={false} 
          resizable={false}>
          <ReviewForm onClose={() => setIsModalOpen(false)} />
        </Dialog>
        )}
    </div>
  )
}

export default Reviews