'use client'
import sendOrder from '@/app/common/sendOrder';
import React, { useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io';
import { useMask } from '@react-input/mask';
import { Calendar } from 'primereact/calendar';
import { setupPrimeReactLocale, formatSelectedDate } from '@/app/common/primereact-locale';

setupPrimeReactLocale();

interface FormModalProps {
  onFormClose: () => void;
}

const Form: React.FC<FormModalProps> = ({ onFormClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [wishes, setWishes] = useState('');
  const inputRef = useMask({
    mask: ' (___) ___-__-__',
    replacement: { _: /\d/ },
  });
  
  const isBtnDisabled = name.length < 2 || phone.length < 16;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center pt-10 justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onFormClose();
        }
      }}
    >
      <div
          className="bg-white max-w-[90%] md:max-w-lg rounded-lg shadow-lg h-auto overflow-y-scroll max-h-[525px] md:w-auto
            w-full pb-6 z-99999"
          onClick={(e) => e.stopPropagation()}
        >
        <div className='mb-2 flex justify-end p-3'>
          <button
            className="text-2xl text-gray-500"
            onClick={onFormClose}
          >
            <IoIosCloseCircle />
          </button>
        </div>
        <h2 className="text-xl px-6 font-bold mb-4">Заполните форму, и мы вам перезвоним!</h2>
        <div className='w-full h-full px-6'>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дата *
            </label>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex">
                  <div className="pl-2 w-[150px] flex items-center">
                    {date ? (
                      <p className="text-black">{formatSelectedDate(date)}</p>
                    ) : (
                      <p className="text-gray-500">Выберите дату</p>
                    )}
                  </div>
                  <Calendar
                    id="datePicker"
                    placeholder="Выберите дату"
                    value={date}
                    onChange={(e) => setDate(e.value ?? null)}
                    showIcon
                    locale="ru"
                    dateFormat="dd MM yy"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Количество персон и бюджет *
              </label>
              <input
                type="text"
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                className="w-full border-b border-red-500 p-2 outline-0"
                placeholder="Например: 10 человек, 15000₽"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Телефон *
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
                placeholder="888 123 45 67"
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-red-500 p-2 outline-0"
              placeholder="Ваше Имя"
            />
          </div>

          <button
            disabled={isBtnDisabled}
            onClick={async () => {
              await sendOrder({
                name,
                phone,
                date,
                wishes
              });
              setName('');
              setPhone('');
              setDate(null);
              setWishes('');
              onFormClose()
            }}
            className={`w-full text-white py-3 rounded-md mt-4 ${
              isBtnDisabled ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500'
            }`}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  )
}

export default Form