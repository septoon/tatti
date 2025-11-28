'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/GlobalRedux/store';
import { addToCart, removeOne } from '@/app/GlobalRedux/Features/cartSlice';
import Loader from '@/app/components/Loader/Loader';

/* ------------------------------------------------------
   Types
------------------------------------------------------ */
export type NewYearItem = {
  id: number;
  name: string;
  order?: number;
  price?: number;
  description?: string[];
  image?: string;
};

type NewYearJSON =
  | Record<string, NewYearItem>   // если объект
  | NewYearItem[];                // если массив

/* ------------------------------------------------------
   Local image sets
------------------------------------------------------ */
const LOCAL_IMAGE_FILES = new Set([
  '1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp', '8.webp',
  '9.webp', '10.webp', '12.webp', '13.webp', '14.webp', '15.webp', '16.webp',
  '17.webp', '18.webp', '19.webp', '22.webp',
  'IMG-3487.webp',
]);

const LOCAL_IMAGE_BY_ORDER: Record<number, string> = {
  20: 'IMG-3487.webp',
};

/* ------------------------------------------------------
   Helpers
------------------------------------------------------ */
const getFileNameFromUrl = (url: string) => {
  if (!url) return '';
  try {
    const u = new URL(url.trim());
    return u.pathname.split('/').pop() || '';
  } catch {
    return '';
  }
};

/* ------------------------------------------------------
   Component
------------------------------------------------------ */
const NewYear: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [items, setItems] = useState<NewYearItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ------------------------------------------------------
     Load JSON
  ------------------------------------------------------ */
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/new-year.json`, {
          cache: 'no-store',
        });

        if (!res.ok) throw new Error('Ошибка при загрузке данных');

        const json: NewYearJSON = await res.json();

        let entries: [string | number, NewYearItem][];

        if (Array.isArray(json)) {
          // массив -> entries()
          entries = Array.from(json.entries()).map(
            ([index, value]): [number, NewYearItem] => [index, value]
          );
        } else {
          // объект -> Object.entries()
          entries = Object.entries(json).map(
            ([key, value]): [string, NewYearItem] => [key, value]
          );
        }

        const normalized: NewYearItem[] = entries
          .map(([key, val]) => ({
            ...(val as NewYearItem),
            order: Number(key) || undefined,
          }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        if (mounted) setItems(normalized);
      } catch (err: any) {
        if (mounted) setError(err.message ?? 'Ошибка');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  /* ------------------------------------------------------
     Resolve final image path
  ------------------------------------------------------ */
  const resolveImage = (item: NewYearItem): string => {
    const order = item.order;
    const orderFile = order ? `${order}.webp` : '';
    const customOverride = order ? LOCAL_IMAGE_BY_ORDER[order] : undefined;
    const urlFile = getFileNameFromUrl(item.image ?? '');

    const chosen =
      (customOverride && LOCAL_IMAGE_FILES.has(customOverride) && customOverride) ||
      (orderFile && LOCAL_IMAGE_FILES.has(orderFile) && orderFile) ||
      (urlFile && LOCAL_IMAGE_FILES.has(urlFile) && urlFile) ||
      '';

    return chosen ? `/new-year/${chosen}` : '';
  };

  /* ------------------------------------------------------
     Rendering
  ------------------------------------------------------ */
  if (loading) return <Loader />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="flex-col justify-between min-h-[100vh] pt-26 md:pt-40 text-white bg-[#151515]">
      <div className="px-4">
        <h1 className="mb-4 font-bold text-2xl md:hidden">Новогоднее меню</h1>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 content-stretch pb-16">
        {items.map((item, index) => {
          const cartItem = cartItems.find((ci) => ci.id === item.id);
          const resolvedImage = resolveImage(item);

          const price = item.price ?? 0;
          const description = item.description?.filter((s) => s.trim().length > 0) ?? [];

          const prioritize = index < 2;
          const loadingType: 'eager' | 'lazy' = prioritize ? 'eager' : 'lazy';

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
                    priority={prioritize}
                    loading={loadingType}
                    quality={70}
                    unoptimized
                  />
                )}
              </div>

              <p className="my-4 font-bold text-lg uppercase">{item.name}</p>

              <div className="flex flex-col flex-grow">
                {description.map((d, idx) => (
                  <p key={idx} className="text-xs text-gray-500">
                    • {d}
                  </p>
                ))}
              </div>

              <div className="flex items-end justify-between mt-auto">
                <p className="text-bold text-xl mr-4">{price} р</p>

                {cartItem ? (
                  <div className="flex items-center bg-red-500 rounded-lg px-1">
                    <button
                      onClick={() => dispatch(removeOne(item.id))}
                      className="px-4 py-2 text-white"
                    >
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
                            image: item.image ?? '',
                          })
                        )
                      }
                      className="px-4 py-2 text-white"
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
                          image: item.image ?? '',
                        })
                      )
                    }
                    className="bg-green-600 px-4 py-2 rounded-lg text-white"
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
