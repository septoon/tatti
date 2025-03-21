import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { removeFromCart, addToCart, removeOne, clearCart } from '@/app/GlobalRedux/Features/cartSlice';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import 'react-datepicker/dist/react-datepicker.css';
import sendOrder from '@/app/common/sendOrder';
import { useMask } from '@react-input/mask';
import axios from 'axios';
import { calculateDeliveryCost, calculateDeliveryDistance } from '@/app/common/calculateDelivery';
import { MdCalculate } from "react-icons/md";
import { Tooltip } from 'primereact/tooltip';
import { TiInfoLarge } from "react-icons/ti";

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
  const inputRef = useMask({
    mask: ' (___) ___-__-__',
    replacement: { _: /\d/ },
  });
  const [wishes, setWishes] = useState('');
  const [name, setName] = useState('');
  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const fetchAddressSuggestions = async (input: string) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete`, {
        params: {
          text: `Республика Крым, ${input}`,
          apiKey: process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY,
          limit: 1,
          lang: 'ru'
        }
      });

      const suggestions = response.data.features.map((feature: any) => feature.properties.formatted);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Ошибка при получении подсказок адресов:', error);
    }
  };

  const handleCalculateDeliveryCost = async () => {
    if (!address.trim()) {
      setDeliveryCost(null);
      return;
    }

    setIsCalculating(true); // Начало загрузки

    try {
      const dist = await calculateDeliveryDistance(address)
      const cost = await calculateDeliveryCost(address);
      setDeliveryCost(cost);
      setDistance(Math.round(dist));
    } catch (error) {
      console.error('Ошибка при расчете стоимости доставки:', error);
      setDeliveryCost(null);
    } finally {
      setIsCalculating(false);
    }
  };

  console.log(deliveryCost)

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={(e) => {
        if (window.innerWidth >= 768 && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white max-w-full md:max-w-lg px-6 py-14 md:rounded-lg shadow-lg 
                    max-h-[100vh] md:max-h-[90vh] md:w-auto
                    md:overflow-y-auto 
                    w-full h-full rounded-none overflow-y-auto z-999"
        onClick={(e) => e.stopPropagation()}
      >
        <div className='fixed left-0 top-0 right-0 bg-white md:hidden flex justify-end p-3'>
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
                        className="p-1 rounded-full cursor-pointer"
                        onClick={() => dispatch(removeOne(item.id))}
                      >
                        <CiCircleMinus />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="p-1 rounded-full cursor-pointer"
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
                    <button onClick={() => dispatch(removeFromCart(item.id))} className='mb-2 cursor-pointer'><IoIosCloseCircleOutline /></button>
                    <p className="text-sm text-gray-500">{item.price * item.quantity} р</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Доставка */}
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Выберите способ доставки</h3>
              <div className="flex flex-col items-start space-x-4 mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={() => {
                      setDeliveryMethod('pickup');
                      setDeliveryCost(null);
                    }}
                  />
                  <span>Самовывоз</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="courier"
                    checked={deliveryMethod === 'courier'}
                    onChange={() => {
                      setDeliveryMethod('courier');
                      handleCalculateDeliveryCost();
                    }}
                  />
                  <span>Доставка курьером </span>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-red-500 p-2 outline-0"
                  placeholder="Введите ваше имя"
                />
              </div>

              {deliveryMethod === 'courier' && (
                <div className="mb-4 relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Адрес
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      const value = e.target.value;
                      setAddress(value);
                    }}
                    className="w-full border-b border-red-500 p-2 outline-0 relative"
                    placeholder="Город, улица, дом, подъезд, квартира"
                  />
                  <button className={`${isCalculating ? 'animate-pulse' : ''} ${deliveryCost ? 'bg-red-500' : 'bg-[#535353]'} p-2 text-white absolute right-0 bottom-0 cursor-pointer`} 
                    onClick={() => handleCalculateDeliveryCost()} >
                    Рассчитать
                  </button>
                  {/* <MdCalculate size={30} color={deliveryCost ? 'green' : '#535353'}
                    onClick={() => handleCalculateDeliveryCost()} 
                    className={`${isCalculating ? 'animate-pulse' : ''} absolute right-0 bottom-2 cursor-pointer`} /> */}
                </div>
              )}

              {/* Телефон */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <div className='flex'>
                  <div className='w-10 mr-0 block p-2 pr-0 border-b border-red-500 bg-white'>
                    <p className='text-black'>+7</p>
                  </div>
                  <input
                    ref={inputRef}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full border-b border-red-500 p-2 pl-0 outline-0"
                    placeholder="(999) 999-99-99"
                    inputMode="numeric"
                  />
                </div>
              </div>

              {/* Выбор даты */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Дата</label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full border-b border-red-500 p-2 outline-0"
                  placeholderText="Выберите дату"
                />
              </div>

              {/* Пожелания */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваши пожелания к составу заказа
                </label>
                <textarea
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  rows={2}
                  className="w-full border-b border-red-500 p-2 outline-0"
                  placeholder="Укажите ингредиенты, которые стоит исключить (например, аллергены)"
                />
              </div>

              <div className="mt-4 text-left">
                <p className="font-bold text-lg">Сумма заказа: {totalPrice} р.</p>
                {deliveryMethod === 'courier' && (
                  isCalculating ? (
                    <p className="text-sm text-gray-500">Расчитываем стоимость...</p>
                  ) : deliveryCost !== null && (
                    <div className='flex items-center'>
                      <p className="font-bold text-lg">Стоимость доставки: {deliveryCost} р.</p>
                      <div className="card flex justify-center">
                          <Tooltip target=".custom-tooltip-btn">
                              <div className='w-full h-full flex flex-col'>
                                <span>Расстояние между точками: {distance} км</span>
                                <span>Рассчет: 30р за 1 км</span>
                                <span>Стоимость доставки = 30р * {distance} км</span>
                              </div>
                          </Tooltip>
                          <TiInfoLarge size={20} color='green' className="custom-tooltip-btn" type="button" data-pr-position="top" data-pr-at="right+120 top"
                data-pr-my="top center-62"/>
                      </div>
                    </div>
                  )
                )}
                <p className="font-bold text-lg">
                  Итоговая сумма: {totalPrice + (deliveryMethod === 'courier' ? (deliveryCost || 0) : 0)} р.
                </p>
              </div>

              <button
                onClick={async () => {
                  await sendOrder({
                    name,
                    phone,
                    date,
                    wishes,
                    deliveryMethod,
                    deliveryCost: deliveryCost !== null ? deliveryCost : undefined,
                    address,
                    cartItems,
                    totalPrice: totalPrice + (deliveryCost || 0)
                  });
                  setName('');
                  setPhone('');
                  setDate(null);
                  setWishes('');
                  setDeliveryMethod('pickup');
                  setAddress('');
                  setDeliveryCost(null);
                  dispatch(clearCart());
                  onClose()
                }}
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