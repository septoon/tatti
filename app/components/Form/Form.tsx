'use client'
import sendOrder from '@/app/common/sendOrder';
import React, { useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io';
import { useMask } from '@react-input/mask';

interface FormModalProps {
  onFormClose: () => void;
}

const Form: React.FC<FormModalProps> = ({ onFormClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const inputRef = useMask({
    mask: ' (___) ___-__-__',
    replacement: { _: /\d/ },
  });
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={(e) => {
        if (window.innerWidth >= 768 && e.target === e.currentTarget) {
          onFormClose();
        }
      }}
    >
      <div
          className="bg-white max-w-[90%] md:max-w-lg rounded-lg shadow-lg 
            max-h-[60vh] md:max-h-[50vh] md:w-auto
            w-full h-full z-999"
          onClick={(e) => e.stopPropagation()}
        >
        <div className='mb-6 flex justify-end p-3'>
          <button
            className="text-2xl text-gray-500"
            onClick={onFormClose}
          >
            <IoIosCloseCircle />
          </button>
        </div>
        <h2 className="text-xl px-6 font-bold mb-4">Оставьте ваши данные и мы свяжемся с вами.</h2>
        <div className='w-full h-full px-6'>
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
          <button
            onClick={async () => {
              await sendOrder({
                name,
                phone
              });
              setName('');
              setPhone('');
              onFormClose()
            }}
            className="w-full bg-red-500 text-white py-3 rounded-md mt-4"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  )
}

export default Form