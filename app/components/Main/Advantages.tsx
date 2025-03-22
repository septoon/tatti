import React from 'react'

const Advantages = () => {
  return (
    <section className='w-full min-h-[100vh] bg-[#2d2d2d]'>
    
    <div className='container mx-auto px-6 py-12'>
      <h2 className='text-5xl font-bold text-orange-500 text-center mb-12'>Наши Преимущества</h2>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        
        <div className='bg-[#3d3d3d] p-6 rounded-lg shadow-md'>
          <h3 className='text-3xl text-white mb-4'>Опыт</h3>
          <p className='text-gray-300'>
            Более 9 лет радуем клиентов в Алуште, создавая незабываемые впечатления с помощью вкусных блюд и изысканной подачи.
          </p>
        </div>
 
        <div className='bg-[#3d3d3d] p-6 rounded-lg shadow-md'>
          <h3 className='text-3xl text-white mb-4'>Индивидуальный подход</h3>
          <p className='text-gray-300'>
            Учитываем ваши пожелания и предпочтения, предлагая блюда, которые идеально дополнят ваш праздник или мероприятие.
          </p>
        </div>
 
        <div className='bg-[#3d3d3d] p-6 rounded-lg shadow-md'>
          <h3 className='text-3xl text-white mb-4'>Качество и свежесть</h3>
          <p className='text-gray-300'>
            Мы используем только свежие и натуральные продукты, чтобы каждое блюдо было не только вкусным, но и полезным.
          </p>
        </div>
 
        <div className='bg-[#3d3d3d] p-6 rounded-lg shadow-md'>
          <h3 className='text-3xl text-white mb-4'>Своевременная доставка</h3>
          <p className='text-gray-300'>
            Мы заботимся о том, чтобы ваши заказы всегда прибывали вовремя, чтобы ваш праздник прошел идеально.
          </p>
        </div>
      </div>
    </div>
    </section>
  )
}

export default Advantages