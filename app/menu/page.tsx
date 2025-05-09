import React from 'react'
import Menu from '../components/Menu/Menu'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Меню — Tatti Shef | Заказать фуршет и доставку еды в Алуште',
  description: 'Фуршетное меню кейтеринга Tatti Shef. Широкий выбор закусок, горячих блюд, десертов и напитков с доставкой по Алуште и Южному Берегу Крыма.',
  keywords: 'меню кейтеринг, фуршет Алушта, доставка еды, Tatti Shef, заказать еду Алушта'
};

const MenuPage = () => {
  return (
    <Menu />
  )
}

export default MenuPage