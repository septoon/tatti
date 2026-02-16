'use client';

import React, { useEffect, useRef, useState } from 'react'
import InfoCarousel from './InfoCarousel';

const infoVideos = [
  '/video/info1.mp4',
  '/video/info2.mp4',
  '/video/info3.mp4',
  '/video/info4.MP4',
  '/video/info5.mp4',
  '/video/info6.mp4',
];

const Info = () => {
  const [shouldLoadCarousel, setShouldLoadCarousel] = useState(false);
  const carouselHostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!carouselHostRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldLoadCarousel(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        // Подгружаем чуть заранее, чтобы к моменту скролла видео уже стартовало.
        rootMargin: '300px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(carouselHostRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className='w-full min-h-[100vh] bg-gradient-to-b from-[#151515] to-[#1e1e1e] text-white py-12'>
      <div className='container mx-auto px-6 pt-12 flex flex-col md:flex-row items-center min-h-[100vh] gap-8'>
        {/* Левая часть с текстом */}
        <div className='md:w-1/2 space-y-6'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-light text-[#bd6c20] tracking-tight'>Tatti_shef</h1>
          <p className='text-white text-lg leading-relaxed'>
            Если вы хотите порадовать себя и своих близких изысканными блюдами, Tatti_shef станет вашим надежным помощником. Мы предлагаем полный спектр кулинарных услуг: от кейтеринга и фуршетов до организации банкетов и праздников под ключ. Наша команда готовит разнообразные закуски, десерты и горячие блюда, которые сделают ваш праздник незабываемым. Более 9 лет мы радуем клиентов не только вкусной едой, но и эстетичной подачей, высоким уровнем сервиса и вниманием к каждой детали.
          </p>
          <p className='text-white text-lg leading-relaxed'>
            Tatti_shef организует мероприятия любого формата — будь то семейные торжества, корпоративные вечеринки или выездные фуршеты. Мы тщательно подбираем ингредиенты и создаем блюда, которые поражают вкусом и презентацией. Особое внимание уделяем пожеланиям клиентов, чтобы каждый праздник стал уникальным.
          </p>
          <p className='text-white text-lg leading-relaxed'>
            Помимо вкусных блюд, мы предлагаем также шоколадные фонтаны, пирамиды из шампанского и тематическое оформление столов. Каждый заказ сопровождается индивидуальным подходом — от разработки меню до организации сервировки. Мы гордимся тем, что стали неотъемлемой частью множества праздничных событий.
          </p>
          <p className='text-white text-lg leading-relaxed'>
            Мы работаем в городе Алушта и готовы порадовать вас оригинальными угощениями на любой случай — будь то романтический вечер, семейный праздник или корпоративное мероприятие.
          </p>
          <p className='text-white text-lg font-semibold'>
            Tatti_shef — это сочетание вкуса, качества и заботы о каждой детали! Наши блюда — это не просто еда, а настоящее кулинарное искусство, созданное с любовью и уважением к традициям. Мы уверены, что ваш праздник станет ярким и запоминающимся благодаря нашим угощениям.
          </p>
        </div>

        {/* Правая часть с видео */}
        <div ref={carouselHostRef} className="md:w-1/2 w-screen -mx-6 md:mx-0 overflow-hidden flex-shrink-0">
          {shouldLoadCarousel ? (
            <InfoCarousel videos={infoVideos} />
          ) : (
            <div className="w-full aspect-[9/16] md:aspect-[3/4] rounded-none md:rounded-2xl bg-[#0f0f0f] border border-white/10" />
          )}
        </div>
      </div>
    </section>
  )
}

export default Info
