import React from 'react';
import Image from 'next/image';
import { FaTelegram, FaVk, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-white p-6 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-8">

        {/* Контактная информация */}
        <div className="flex flex-col items-center md:items-start md:self-start">
          <h4 className="text-xl font-medium font-PTSans">Контакты</h4>
          <p>г. Алушта, ул. Ленина, 13г</p>
          <a href="tel:+79785103520" className="mt-1 text-red-400 hover:text-red-300">+7 (978) 510-35-20</a>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a href="https://t.me/+o6rCb4Wm0PtmZGM6" target="_blank" aria-label="Instagram" className="text-gray-400 hover:text-white">
              <FaTelegram size={24} />
            </a>
            <a href="https://www.instagram.com/tatti_shef" target="_blank" aria-label="Instagram" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
            <a href="https://vk.com/tatti_shef" target="_blank" aria-label="VK" className="text-gray-400 hover:text-white">
              <FaVk size={24} />
            </a>
            <a href="https://wa.me/79785103520" target="_blank" aria-label="WhatsApp" className="text-gray-400 hover:text-white">
              <FaWhatsapp size={24} />
            </a>
          </div>

        </div>

         {/* Логотип и бренд */}
         <div className=''>
          <div className="flex flex-col justify-center items-center md:flex-row">
            <Image src="/logo.png" alt="Tatti_shef Logo" width={80} height={80} className="mb-2 md:mb-0 md:mr-2 md:w-10" />
            <h4 className="text-2xl font-light italic">Tatti_shef</h4>
          </div>
          <p className="text-sm text-gray-400 mt-2">© {new Date().getFullYear()} Все права защищены</p>
          <div className='flex items-center'>
            <p className='text-sm mr-2'>Разработано студией </p> 
            <a href="https://lumastack.ru" target="_blank" rel="noopener noreferrer" className='text-sm underline'>LumaStack</a>
          </div>
         </div>

         <div className='min-w-[200px]'>

         </div>
      </div>
    </footer>
  );
};

export default Footer;