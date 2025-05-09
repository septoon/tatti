import React from 'react'
import type { Metadata } from 'next';
import Cakes from '../components/Cakes/Cakes';

export const metadata: Metadata = {
  title: 'Торты и десерты — Tatti Shef | Заказать сладости в Алуште',
  description: 'Вкусные торты и десерты от Tatti Shef. Закажите авторские сладости с доставкой по Алуште и Южному Берегу Крыма.',
  keywords: 'торты Алушта, десерты Tatti Shef, доставка сладостей, заказать торт, торт на заказ ЮБК'
};

const CakesPage = () => {
  return (
    <Cakes />
  )
}

export default CakesPage