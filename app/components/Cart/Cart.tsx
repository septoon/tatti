import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { removeFromCart, addToCart, removeOne } from '@/app/GlobalRedux/Features/cartSlice';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import 'react-datepicker/dist/react-datepicker.css';

interface CartModalProps {
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'courier'>('pickup');
  const [date, setDate] = useState<Date | null>(null);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [wishes, setWishes] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      
      <div className="bg-white max-w-full md:max-w-lg px-6 py-14 md:rounded-lg shadow-lg 
                  max-h-[100vh] md:max-h-[90vh] md:w-auto
                  md:overflow-y-auto 
                  w-full h-full rounded-none overflow-y-auto z-999">
        <div className='fixed left-0 top-0 right-0 bg-white md:bg-transparent flex justify-end p-3'>
          <button
            className="text-2xl text-gray-500"
            onClick={onClose}
          >
            <IoIosCloseCircle />
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Ваш заказ:</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Корзина пуста</p>
        ) : (
          <>
            <div className="">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-black/40 py-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div className="flex-grow mx-4">
                    <span className="">{item.name}</span>
                    <div className="flex items-center">
                      <button
                        className="p-1rounded-full"
                        onClick={() => dispatch(removeOne(item.id))}
                      >
                        <CiCircleMinus />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="p-1 rounded-full"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                            })
                          )
                        }
                      >
                        <CiCirclePlus />
                      </button>
                    </div>
                  </div>
                  <div className='flex flex-col items-end'>
                    <button onClick={() => dispatch(removeFromCart(item.id))} className='mb-2'><IoIosCloseCircleOutline /></button>
                    <p className="text-sm text-gray-500">{item.price} р</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Доставка */}
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Выберите способ доставки</h3>
              <div className="flex flex-col items-start space-x-4 mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={() => setDeliveryMethod('pickup')}
                  />
                  <span>Самовывоз</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="courier"
                    checked={deliveryMethod === 'courier'}
                    onChange={() => setDeliveryMethod('courier')}
                  />
                  <span>Доставка курьером (от 200 руб.)</span>
                </label>
              </div>

              <p className="text-sm text-gray-500 my-4">
                Уважаемые клиенты!<br />
                Прием заказов: пн-вс с 09:00-20:00.<br />
                Заказ обрабатывается в порядке очереди. Проверяйте внесенные контактные данные.<br />
                Менеджер свяжется с Вами для уточнения заказа. Для оплаты будет сформирована специальная ссылка.<br />
                Благодарим за понимание!
              </p>

              {/* Имя */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Имя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-red-500 p-2"
                  placeholder="Введите ваше имя"
                />
              </div>

              {deliveryMethod === 'courier' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Адрес
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border-b border-red-500 p-2"
                    placeholder="Город, улица, дом, подъезд, квартира"
                  />
                </div>
              )}

              {/* Телефон */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border-b border-red-500 p-2"
                  placeholder="+7 (999) 999-99-99"
                />
              </div>

              {/* Выбор даты */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Дата</label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full border-b border-red-500 p-2"
                  placeholderText="Выберите дату"
                />
              </div>

              {/* Пожелания */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Ваши пожелания к составу заказа
                </label>
                <textarea
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  rows={2}
                  className="w-full border-b border-red-500 p-2"
                  placeholder="Укажите ингредиенты, которые стоит исключить (например, аллергены)"
                />
              </div>

              <div className="mt-4 text-left">
                <p className="font-bold text-lg">Итоговая сумма: {totalPrice} р.</p>
              </div>

              <button
                className="w-full bg-red-500 text-white py-3 rounded-md mt-4"
              >
                Оформить заказ
              </button>

              <p className="text-sm text-center text-gray-500 mt-4">
                Бесплатная доставка при заказе от 5 000 руб. в черте города
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;