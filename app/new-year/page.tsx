import React from 'react';
import type { Metadata } from 'next';
import NewYear from '../components/NewYear/NewYear';

export const metadata: Metadata = {
  title: 'Новогоднее меню — Tatti Shef | Праздничные боксы и доставка по Алуште',
  description:
    'Новогодние боксы, закуски и праздничные блюда от Tatti Shef с доставкой по Алуште и Южному Берегу Крыма. Соберите готовый стол для корпоратива или семейного ужина.',
  keywords: 'новогоднее меню, праздничные боксы, кейтеринг Алушта, Tatti Shef, доставка блюд',
  alternates: {
    canonical: '/new-year',
  },
  openGraph: {
    title: 'Новогоднее меню — Tatti Shef',
    description:
      'Сезонное новогоднее меню с доставкой: боксы, закуски и десерты от Tatti Shef для семейных и корпоративных праздников.',
    url: 'https://tatti-shef.ru/new-year',
  },
};

const NewYearPage = () => {
  return <NewYear />;
};

export default NewYearPage;
