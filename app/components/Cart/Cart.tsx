import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { removeFromCart, addToCart, removeOne, clearCart } from '@/app/GlobalRedux/Features/cartSlice';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import 'react-datepicker/dist/react-datepicker.css';
import sendOrder from '@/app/common/sendOrder';
import { useMask } from '@react-input/mask';
import EmptyCart from "@/public/images/empty_cart.svg";
import { Checkbox } from 'primereact/checkbox';
import { Tooltip } from 'primereact/tooltip';
import { TiInfoLarge } from "react-icons/ti";
import { servicePackages } from '@/app/api/servicePackages';
import { Button } from 'primereact/button';
        

interface CartModalProps {
  onClose: () => void;
  isModalOpen: boolean;
}

type ServicePackage = {
  id: number;
  name: string;
  price: number;
  cost: string;
  includes: string[];
  image: string;
};

type ExtraService = {
  id: number;
  name: string;
  price: number;
  cost: string;
  note: string;
  image: string;
};

type ServicePackages = {
  packages: ServicePackage[];
  extras: ExtraService[];
};

const data: ServicePackages = servicePackages;

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
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (itemName: string) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(itemName)) {
        return prevSelected.filter((name) => name !== itemName);
      } else {
        return [...prevSelected, itemName];
      }
    });
  };

  const isBtnDisabled = deliveryMethod === 'courier' ? name.length < 2 || phone.length < 16 || address.length < 4 : name.length < 2 || phone.length < 16

  return (
      <div className="bg-[#151515] text-white max-w-full md:max-w-lg px-6 py-4 md:rounded-lg
                    max-h-[100vh] md:max-h-[90vh] md:w-auto
                    md:overflow-y-auto 
                    w-full h-full rounded-none overflow-y-auto z-999">

        {cartItems.length === 0 ? (
           <div className='w-full h-full flex flex-col items-center justify-center'>
            <Image
              src={EmptyCart}
              alt='Такого у нас нет'
              width={300}
              height={300}
              className='mb-4'
            />
            <span className=' text-2xl text-red-400'>Пока тут пусто</span>
          </div>
        ) : (
          <>
            <div className="">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-black/40 py-3">
                  <Image
                    src={
                      Array.isArray(item.images) && item.images.length > 0
                        ? item.images[0]
                        : item.image
                    }
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
                      <span className="mx-2">{`${item.quantity} ${item.unit}`}</span>
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

            <div>
              <h2 className="text-2xl font-semibold mt-10 mb-4">Дополнительно</h2>
              <div className="grid gap-6 md:grid-cols-2 mb-4">
                {data.packages.map((pkg, index) => {
                  const cartItem = cartItems.find((item) => item.id === pkg.id);
                  return (
                    <div key={pkg.id} className={`${cartItem ? 'border-2 border-gray-400' : 'border-none'} bg-[#1e1e1e] p-4 rounded-lg`}
                      onClick={() => {
                        handleSelect(pkg.name);
                        if (cartItem) {
                          dispatch(removeOne(pkg.id));
                        } else {
                          dispatch(
                            addToCart({
                              id: pkg.id,
                              name: pkg.name,
                              price: Number(pkg.price),
                              image: pkg.image,
                            })
                          );
                        }
                      }}>
                      <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
                      <div className='flex justify-between'>
                        <p className="text-sm text-gray-300 mb-2">{pkg.price}</p>
                        <div className="card flex justify-center">
                          <Tooltip target={`#tooltip-package-${index}`} className="custom-tooltip w-1/2">
                            {pkg.includes.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </Tooltip>
                          <TiInfoLarge onClick={(event) => event.stopPropagation()} size={20} color='green' id={`tooltip-package-${index}`} type="button" data-pr-position="top" data-pr-at="right+0 top" data-pr-my="top center-150" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {data.extras.map((extra, index) => {
                  const cartItem = cartItems.find((item) => item.id === extra.id);
                  return (
                    <div key={extra.id} className={`${cartItem ? 'border-2 border-gray-400' : 'border-none'} bg-[#1e1e1e] p-4 rounded-lg`} 
                    onClick={() => {
                      handleSelect(extra.name);
                      if (cartItem) {
                        dispatch(removeOne(extra.id));
                      } else {
                        dispatch(
                          addToCart({
                            id: extra.id,
                            name: extra.name,
                            price: Number(extra.price),
                            image: extra.image,
                          })
                        );
                      }
                    }}>
                      <h3 className="text-xl font-medium">{extra.name}</h3>
                      <div className='flex justify-between'>
                        <p className="text-sm text-gray-300">{extra.price}</p>
                        <div className="card flex justify-center">
                          <Tooltip target={`#tooltip-extra-${index}`} className="custom-tooltip w-1/2 min-h30">
                            <p className="text-sm ">{extra.note}</p>
                          </Tooltip>
                          <TiInfoLarge size={20} color='green' id={`tooltip-extra-${index}`} type="button" data-pr-position="top" data-pr-at="right+120 top" data-pr-my="top center-120" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Доставка */}
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-6">Выберите способ доставки</h3>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  inputId="pickup"
                  name="delivery"
                  value="pickup"
                  variant="filled"
                  onChange={() => {
                    setDeliveryMethod('pickup');
                    setDeliveryCost(null);
                  }}
                  checked={deliveryMethod === 'pickup'}
                />
                <label htmlFor="pickup" className="text-white">Самовывоз</label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  inputId="courier"
                  name="delivery"
                  value="courier"
                  className='border-0 '
                  onChange={() => {
                    setDeliveryMethod('courier');
                  }}
                  checked={deliveryMethod === 'courier'}
                />
                <label htmlFor="courier" className="text-white">Доставка курьером</label>
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
                  Имя *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-gray-500 p-2 outline-0"
                  placeholder="Введите ваше имя"
                />
              </div>

              {deliveryMethod === 'courier' && (
                <div className="mb-4 relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Адрес *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      const value = e.target.value;
                      setAddress(value);
                    }}
                    className="w-full border-b border-gray-500 p-2 outline-0 relative"
                    placeholder="Город, улица, дом, подъезд, квартира"
                  />
                </div>
              )}

              {/* Телефон */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон *
                </label>
                <div className='flex'>
                  <div className='w-10 mr-0 block p-2 pr-0 border-b border-gray-500 bg-[#151515]'>
                    <p className={phone.length > 0 ? 'text-white' : 'text-gray-500'}>+7</p>
                  </div>
                  <input
                    ref={inputRef}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full border-b border-gray-500 p-2 pl-0 outline-0"
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
                  className="w-full border-b border-gray-500 p-2 outline-0"
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
                  className="w-full border-b border-gray-500 p-2 outline-0"
                  placeholder="Укажите ингредиенты, которые стоит исключить (например, аллергены)"
                />
              </div>

              <div className="my-4 text-left">
                <p className="font-bold text-lg">Итоговая сумма: {totalPrice} р.</p>
              </div>

              <Button label='Оформить заказ' disabled={isBtnDisabled}
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
              />
              <p className="text-sm text-center text-gray-500 mt-4">
                Стоимость доставки уточняйте у менеджера.
              </p>
            </div>
          </>
        )}
      </div>
  );
};

export default CartModal;