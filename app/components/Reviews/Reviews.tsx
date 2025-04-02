import React from 'react'
import ParallaxCarouselReviews from '../Carousel/ParallaxCarouselReviews'
import { reviews } from '@/app/api/reviews'

const Reviews = () => {
  return (
    <div className='bg-[#130E0C] container mx-auto px-6 pt-12 pb-8'>
      <h1 className='text-5xl text-orange-500 opacity-55 mb-12 font-black'>Отзывы</h1>

      <ParallaxCarouselReviews reviews={reviews} />
      <button className='text-orange-300 mt-8 border rounded-2xl px-4 py-2'>Оставить отзыв</button>
    </div>
  )
}

export default Reviews