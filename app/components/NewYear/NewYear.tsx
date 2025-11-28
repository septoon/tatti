'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/GlobalRedux/store';
import { addToCart, removeOne } from '@/app/GlobalRedux/Features/cartSlice';
import Loader from '@/app/components/Loader/Loader';
import ParallaxCarousel from '@/app/components/Carousel/ParallaxCarousel';

/* ------------------------------------------------------
   Types
------------------------------------------------------ */
export type NewYearItem = {
  id: number;
  name: string;
  order?: number;
  images?: string[];
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
  '9.webp', '10.webp', '12.webp', '13.webp', '14.webp', '15.webp', '16.webp', '16-1.webp', '16-2.webp', '16-3.webp',
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

const resolveFileName = (candidate: string, item: NewYearItem) => {
  const raw = candidate?.trim();
  const fromUrl = getFileNameFromUrl(raw);
  const name = fromUrl || raw;

  if (name && LOCAL_IMAGE_FILES.has(name)) {
    return name;
  }

  if (item.order) {
    const override = LOCAL_IMAGE_BY_ORDER[item.order];
    if (override && LOCAL_IMAGE_FILES.has(override)) return override;

    const orderFile = `${item.order}.webp`;
    if (LOCAL_IMAGE_FILES.has(orderFile)) return orderFile;
  }

  return '';
};

const resolveImages = (item: NewYearItem): string[] => {
  const candidates =
    Array.isArray(item.images) && item.images.length > 0
      ? item.images
      : item.image
        ? [item.image]
        : item.order
          ? [`${item.order}.webp`]
          : [];

  const resolved = candidates
    .map((img) => resolveFileName(img, item))
    .filter((name): name is string => Boolean(name));

  return Array.from(new Set(resolved)).map((name) => `/new-year/${name}`);
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
          const resolvedImages = resolveImages(item);
          const displayImages = resolvedImages.length > 0 ? resolvedImages : [];
          const firstImage = displayImages[0];

          const price = item.price ?? 0;
          const description = item.description?.filter((s) => s.trim().length > 0) ?? [];

          const prioritize = index < 2;
          const loadingType: 'eager' | 'lazy' = prioritize ? 'eager' : 'lazy';

          return (
            <div key={item.id} className="flex flex-col items-start w-full h-full mb-6 p-4 rounded-md">
              <div className="w-full h-[330px] mb-6 py-4 rounded-md">
                {displayImages.length > 0 ? (
                  <ParallaxCarousel images={displayImages} />
                ) : null}
              </div>

              <p className="my-4 font-bold text-lg uppercase">{item.name}</p>

              <div className="flex flex-col flex-grow">
                {description.map((d, idx) => (
                  <p key={idx} className="text-xs text-gray-500">
                    • {d}
                  </p>
                ))}
              </div>

              <div className="flex items-end justify-between w-full mt-auto">
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
                            image: firstImage ?? item.image ?? '',
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
                          image: firstImage ?? item.image ?? '',
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
