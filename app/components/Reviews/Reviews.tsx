'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ParallaxCarouselReviews from '../Carousel/ParallaxCarouselReviews'
import { Dialog } from 'primereact/dialog'
import { position, handleShow } from '@/app/common/positions'
import ReviewForm from './ReviewForm'
import Loader from '../Loader/Loader'

const Reviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reviewsData, setReviewsData] = useState<any[]>([])
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true)
  const [reviewsError, setReviewsError] = useState<string | null>(null)

  const handleShowModal = () => {
    handleShow(setIsModalOpen)
  }

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews.json?t=${Date.now()}`)
        // Предполагаем, что data — массив отзывов
        setReviewsData(res.data)
      } catch (err: any) {
        setReviewsError(err.message || 'Ошибка загрузки отзывов')
      } finally {
        setReviewsLoading(false)
      }
    }
    fetchReviews()
  }, [])

  if (reviewsLoading) {
    return <Loader />
  }

  if (reviewsError) {
    return <div className="text-center py-8 text-red-500">{reviewsError}</div>
  }

  return (
    <div className='bg-[#130E0C] mx-auto px-6 pt-12 pb-8 min-h-[190px]'>
      <h1 className='text-5xl font-light text-[#bd6c20] opacity-60 mb-12'>Отзывы</h1>
      {reviewsData.length === 0 ? (
  <div className="text-center py-8">
    <p className="text-2xl font-semibold text-gray-400">
      Отзывов пока нет. Будьте первым! 😊
    </p>
  </div>
) : (
  <ParallaxCarouselReviews reviews={[...reviewsData].reverse()} />
)}
      <button
        className='text-orange-300 mt-8 border rounded-2xl px-4 py-2'
        onClick={handleShowModal}
      >
        Оставить отзыв
      </button>
      {isModalOpen && (
        <Dialog
          header="Оставить отзыв"
          blockScroll={true}
          visible={isModalOpen}
          position={position}
          style={{ width: '100vw', maxWidth: '512px', minHeight: '90vh', margin: 0 }}
          contentStyle={{ backgroundColor: '#151515' }}
          onHide={() => {
            if (!isModalOpen) return
            setIsModalOpen(false)
          }}
          draggable={false}
          resizable={false}
        >
          <ReviewForm onClose={() => setIsModalOpen(false)} />
        </Dialog>
      )}
    </div>
  )
}

export default Reviews