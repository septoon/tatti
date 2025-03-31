'use client'
import React from 'react'
import { RootState } from '@/app/GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';
import CartServices from './CartServices'
import Image from 'next/image';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { addToCart, removeFromCart, removeOne } from '@/app/GlobalRedux/Features/cartSlice';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const CartItems = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="">
      <CartServices />
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
  )
}

export default CartItems