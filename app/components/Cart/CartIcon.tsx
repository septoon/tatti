'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import CartModal from './Cart';
import { Tooltip } from 'primereact/tooltip';
        

const CartIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={`font-ptSans rounded-full w-16 h-16 bg-white shadow-lg fixed top-[80px] right-4 md:top-[120px] md:right-[16px] z-50 ${totalQuantity === 0 ? 'hidden' : ''}`}>
      <Tooltip target=".logo" mouseTrack mouseTrackLeft={10} />
      <button
        className='relative rounded-full w-full h-full  text-white p-3'
        onClick={() => setIsModalOpen(true)}
        title={`Сумма: ${totalAmount.toLocaleString()} р.`}
      >
        🛒
        {totalQuantity > 0 && (
          <span className='absolute bottom-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center'>
            {totalQuantity}
          </span>
        )}
      </button>

      {isModalOpen && <CartModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default CartIcon;