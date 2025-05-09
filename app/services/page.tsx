import React from 'react'
import Services from '../components/Services/Services'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Услуги — Tatti Shef | Организация мероприятий под ключ',
  description: 'Посмотрите, какие услуги предоставляет кейтеринг Tatti Shef: организация мероприятий, аренда оборудования, выездные банкеты и другое.',
  keywords: 'услуги кейтеринг, аренда посуды, выездные банкеты, Tatti Shef, организация мероприятий'
};

const ServicesPage = () => {
  return (
    <Services />
  )
}

export default ServicesPage