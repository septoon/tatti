import React from 'react'

const Info = () => {
  return (
    <section className='w-full min-h-[100vh] bg-[#151515]'>
      <div className='container mx-auto px-6 py-12 flex flex-col md:flex-row items-center min-h-[100vh]'>
        <div className='md:w-1/2'>
          <h1 className='text-6xl font-bold text-orange-500 mb-6'>Tatti_shef</h1>
          <p className='text-white mb-4'>
            Если вы хотите порадовать себя и своих близких изысканными блюдами, Tatti_shef станет вашим надежным помощником. Мы готовим разнообразные закуски, десерты и горячие блюда, которые сделают ваш праздник незабываемым. Наша команда более 9 лет радует своих клиентов вкусной едой, эстетичной подачей и высоким уровнем сервиса.
          </p>
          <p className='text-white mb-4'>
            Мы работаем в городе Алушта и готовы порадовать вас оригинальными угощениями на любой случай — будь то романтический вечер, семейный праздник или корпоративное мероприятие.
          </p>
          <p className='text-white'>
            Tatti_shef — это сочетание вкуса, качества и заботы о каждой детали!
          </p>
          
        </div>

        <div className='md:w-1/2 mt-8 md:mt-0 flex justify-center items-center'>
          <img src="https://i.ibb.co/CpQ5KzMD/image-0.webp" alt="Кейтеринг Алушта" className='md:w-3/2 lg:w-1/2 rounded-lg shadow-lg'/>
        </div>
      </div>
    </section>
  )
}

export default Info