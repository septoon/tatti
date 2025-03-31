import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import sendOrder from '@/app/common/sendOrder';
import { useMask } from '@react-input/mask';
import { Button } from 'primereact/button';
import EmptyCart from './EmptyCart';
import CartItems from './CartItems';
import DeliveryMethod from './DeliveryMethod';
import { clearCart } from '@/app/GlobalRedux/Features/cartSlice';
interface CartModalProps {
  onClose: () => void;
  isModalOpen: boolean;
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


  const isBtnDisabled = deliveryMethod === 'courier' ? name.length < 2 || phone.length < 16 || address.length < 4 : name.length < 2 || phone.length < 16

  return (
      <div className="bg-[#151515] text-white max-w-full md:max-w-lg px-6 py-4 md:rounded-lg
                    max-h-[100vh] md:max-h-[90vh] md:w-auto
                    md:overflow-y-auto 
                    w-full h-full rounded-none overflow-y-auto z-999">

        <DeliveryMethod deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod} />
        {cartItems.length === 0 ? (
           <EmptyCart />
        ) : (
          <>
            <CartItems/>

            {/* Доставка */}
            <div className="mt-4">
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
                    address,
                    cartItems,
                    totalPrice: totalPrice
                  });
                  setName('');
                  setPhone('');
                  setDate(null);
                  setWishes('');
                  setDeliveryMethod('pickup');
                  setAddress('');
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