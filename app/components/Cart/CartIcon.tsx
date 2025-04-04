'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import CartModal from './Cart';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { position, handleShow } from '@/app/common/positions';

const CartIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleShowModal = () => {
    handleShow(setIsModalOpen);
  };

  return (
    <div className={`font-ptSans rounded-full w-16 h-16`}>
      <Tooltip target=".logo" mouseTrack mouseTrackLeft={10} />
      <button
        className='relative rounded-full w-full h-full cursor-pointer text-white flex justify-center items-center'
        onClick={handleShowModal}
        title={`Сумма: ${totalAmount.toLocaleString()} р.`}
      >
        <HiOutlineShoppingCart size={30} />
        {totalQuantity > 0 && (
          <span className='absolute bottom-2 right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center'>
            {totalQuantity}
          </span>
        )}
      </button>

      {isModalOpen && (
        <Dialog header="Корзина" blockScroll={true} 
          visible={isModalOpen} position={position} 
          style={{ width: '100vw', maxWidth: '512px', minHeight: '90vh', margin: 0 }} 
          contentStyle={{ backgroundColor: '#151515' }}
          onHide={() => {if (!isModalOpen) return; setIsModalOpen(false); }} 
          draggable={false} 
          resizable={false}>
          <CartModal onClose={() => setIsModalOpen(false)} isModalOpen={isModalOpen} />
        </Dialog>
        )}
    </div>
  );
};

export default CartIcon;