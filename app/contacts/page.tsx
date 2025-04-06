import React from 'react'

const Contacts = () => {
  return (
    <div className=" text-white bg-[#2d2d2d] p-6 md:p-12 min-h-[100vh] md:min-h-[calc(100vh-168px)] pt-30 md:pt-40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row">

        {/* Карта */}
        <div className="flex-1 mb-6 md:mb-0 md:mr-6">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A1ddf769812dd848c2b3196ccdc4d59ae1b14a30cddf2975089bc651c02c5f1e7&amp;source=constructor"
            width="100%"
            height="300"
            className="rounded-md"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Контактная информация */}
        <div className="flex-1">
          <div className='flex flex-col  space-y-2'>
            <h2 className="text-2xl font-bold">Контакты</h2>
            <span className='uppercase font-bold text-sm text-gray-500 mt-2'> Адрес</span>
            <span>г. Алушта, ул. Ленина, 13г</span>
            <span className='uppercase font-bold text-sm text-gray-500 mt-2'> Режим работы</span>
            <span>Пн.-Вс. с 9.00 до 22.00</span>
            <span className='uppercase font-bold text-sm text-gray-500 mt-2'> Телефон</span>
            <a href="tel:+79785103520" className='underline'>+7 (978) 510-35-20</a>
            <span className='uppercase font-bold text-sm text-gray-500 mt-2'> E-mail</span>
            <a href="mailto:contact@tatti-shef.ru" className='underline'>contact@tatti-shef.ru</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts