'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/GlobalRedux/store';
import { addToCart, removeOne } from '@/app/GlobalRedux/Features/cartSlice';
import Loader from '@/app/components/Loader/Loader';

type NewYearItem = {
  id: number;
  name: string;
  order?: number;
  price?: number;
  description?: string[];
  image?: string;
};

const LOCAL_IMAGE_FILES = new Set([
  '1.webp',
  '2.webp',
  '3.webp',
  '4.webp',
  '5.webp',
  '6.webp',
  '7.webp',
  '8.webp',
  '9.webp',
  '10.webp',
  '12.webp',
  '13.webp',
  '14.webp',
  '15.webp',
  '16.webp',
  '17.webp',
  '18.webp',
  '19.webp',
  '22.webp',
  'IMG-3487.webp',
]);

const LOCAL_IMAGE_BY_ORDER: Record<number, string> = {
  // Несовпадающие имена файлов
  20: 'IMG-3487.webp',
};

const getFileNameFromUrl = (url: string) => {
  if (!url) return '';
  try {
    const parsed = new URL(url.trim());
    return parsed.pathname.split('/').pop() || '';
  } catch {
    return '';
  }
};

const NewYear: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [newYearData, setNewYearData] = useState<NewYearItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNewYear = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/new-year.json`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Ошибка при загрузке данных');
        }

        const data = await res.json();
        const entries = Array.isArray(data) ? data.entries() : Object.entries(data);

        const newYearArray: NewYearItem[] = Array.from(entries)
          .map(([key, value]: any) => ({
            ...(value as NewYearItem),
            order: Number(key) || undefined,
          }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        if (isMounted) {
          setNewYearData(newYearArray);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || 'Ошибка');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNewYear();

    return () => {
      isMounted = false;
    };
  }, []);

  const resolveImageSrc = (item: NewYearItem) => {
    const orderFileName = item.order ? `${item.order}.webp` : '';
    const overrideFile = item.order ? LOCAL_IMAGE_BY_ORDER[item.order] : undefined;
    const urlFileName = getFileNameFromUrl(item.image ?? '');

    const picked =
      overrideFile && LOCAL_IMAGE_FILES.has(overrideFile)
        ? overrideFile
        : orderFileName && LOCAL_IMAGE_FILES.has(orderFileName)
          ? orderFileName
          : urlFileName && LOCAL_IMAGE_FILES.has(urlFileName)
            ? urlFileName
            : '';

    return picked ? `/new-year/${picked}` : '';
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="flex-col justify-between min-h-[100vh] pt-26 md:pt-40 text-white bg-[#151515]">
      <div className="px-4">
        <h1 className="mb-4 font-bold text-2xl md:hidden">Новогоднее меню</h1>
        {/* <h3 className="mb-4 font-normal text-xl text-red-400">Заказы принимаем до 16.04</h3> */}
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 content-stretch pb-16">
        {newYearData.map((item, index) => {
          const cartItem = cartItems.find((ci) => ci.id === item.id);
          const image = item.image ?? '';
          const price = item.price ?? 0;
          const description = (item.description ?? []).filter((desc) => desc?.trim().length > 0);
          const prioritizeImage = index < 2;
          const loadingType: 'lazy' | 'eager' = prioritizeImage ? 'eager' : 'lazy';
          const resolvedImage = resolveImageSrc(item);

          return (
            <div key={item.id} className="flex flex-col w-auto h-full mb-6 p-4 rounded-md">
              <div className="w-full h-[300px] overflow-hidden rounded-md bg-gray-900 flex items-center justify-center">
                {resolvedImage && (
                  <Image
                    src={resolvedImage}
                    alt={item.name}
                    width={350}
                    height={300}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    priority={prioritizeImage}
                    loading={loadingType}
                    quality={70}
                    unoptimized
                  />
                )}
              </div>
              <p className="my-4 font-bold text-lg uppercase">{item.name}</p>
              <div className="flex flex-col flex-grow">
                {description.map((desc, idx) => (
                  <p className="text-xs text-gray-500" key={idx}>
                    • {desc}
                  </p>
                ))}
              </div>
              <div className="flex items-end justify-between mt-auto">
                <p className="text-bold text-xl mr-4 transition-all duration-300">{price} р</p>
                {cartItem ? (
                  <div className="flex items-center bg-red-500 rounded-lg px-1">
                    <button onClick={() => dispatch(removeOne(item.id))} className="px-4 py-2 text-white cursor-pointer">
                      -
                    </button>
                    <span className="mx-1.5 text-white font-pt-sans">{cartItem.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price,
                            image,
                          })
                        )
                      }
                      className="px-4 py-2 text-white cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price,
                          image,
                        })
                      )
                    }
                    className="bg-green-600 px-4 py-2 rounded-lg text-white cursor-pointer"
                  >
                    В корзину
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewYear;
