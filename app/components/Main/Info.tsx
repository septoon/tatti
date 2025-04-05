import React from 'react'

const Info = () => {
  return (
    <section className='w-full min-h-[100vh] bg-gradient-to-b from-[#151515] to-[#1e1e1e] text-white py-12'>
      <div className='container mx-auto px-6 py-12 flex flex-col md:flex-row items-center min-h-[100vh] gap-8'>
        {/* Левая часть с текстом */}
        <div className='md:w-1/2 space-y-6'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-light text-[#bd6c20] tracking-tight'>Tatti_shef</h1>
          <p className='text-white text-lg leading-relaxed'>
            Если вы хотите порадовать себя и своих близких изысканными блюдами, Tatti_shef станет вашим надежным помощником. Мы предлагаем полный спектр кулинарных услуг: от кейтеринга и фуршетов до организации банкетов и праздников под ключ. Наша команда готовит разнообразные закуски, десерты и горячие блюда, которые сделают ваш праздник незабываемым. Более 9 лет мы радуем клиентов не только вкусной едой, но и эстетичной подачей, высоким уровнем сервиса и вниманием к каждой детали.
          </p>
          <p className='text-white text-lg leading-relaxed'>
            Tatti_shef организует мероприятия любого формата — будь то семейные торжества, корпоративные вечеринки или выездные фуршеты. Мы тщательно подбираем ингредиенты и создаем блюда, которые поражают вкусом и презентацией. Особое внимание уделяем пожеланиям клиентов, чтобы каждый праздник стал уникальным.
          </p>
          <p className='text-white text-lg leading-relaxed'>
            Помимо вкусных блюд, мы предлагаем также шоколадные фонтаны, пирамиды из шампанского и тематическое оформление столов. Каждый заказ сопровождается индивидуальным подходом — от разработки меню до организации сервировки. Мы гордимся тем, что стали неотъемлемой частью множества праздничных событий.
          </p>
          <p className='text-white text-lg leading-relaxed'>
            Мы работаем в городе Алушта и готовы порадовать вас оригинальными угощениями на любой случай — будь то романтический вечер, семейный праздник или корпоративное мероприятие.
          </p>
          <p className='text-white text-lg font-semibold'>
            Tatti_shef — это сочетание вкуса, качества и заботы о каждой детали! Наши блюда — это не просто еда, а настоящее кулинарное искусство, созданное с любовью и уважением к традициям. Мы уверены, что ваш праздник станет ярким и запоминающимся благодаря нашим угощениям.
          </p>
        </div>

        {/* Правая часть с изображением */}
        <div className='md:w-1/2 flex justify-center items-center'>
          <div className='relative group'>
            <img src="https://i.ibb.co/CpQ5KzMD/image-0.webp" alt="Кейтеринг Алушта" className='md:w-3/2 lg:w-1/2 rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1' />
            <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center'>
              <p className='text-xl font-semibold text-white'>Гастрономическое искусство</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Info