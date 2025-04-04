import React from 'react'

const Delivery = () => {
  return (
    <div className=" text-white bg-[#2d2d2d] p-6 md:p-12 h-[100vh] md:h-[100vh] pt-30 md:pt-40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
        {/* Левая колонка */}
        <div className="flex-1 mb-6 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-bold">Доставка и оплата</h1>
        </div>

        {/* Правая колонка */}
        <div className="flex-1 space-y-4">
          <p>
            Уважаемые клиенты, обратите внимание, что <strong>выполнение заказа зависит от загруженности и времени работы кухни.</strong>
          </p>
          <p>
            Каждый заказ обрабатывается менеджером, который <strong>свяжется с вами и обсудит все детали:</strong> состав заказа, время приготовления и доставки.
          </p>
          <p>
            Заказ передается в производство только <strong>после получения 100% оплаты.</strong>
          </p>

          <div className="bg-red-700 text-white p-4 mt-8 flex items-center rounded-md">
            <div>
              <p><strong>Бесплатная доставка:</strong></p>
              <p>При заказе от 5.000 руб. в пределах города</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delivery