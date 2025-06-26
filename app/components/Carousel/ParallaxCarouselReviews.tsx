'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import './ParallaxCarousel.css';
import Image from 'next/image';

const TWEEN_FACTOR_BASE = 0.2;

type Review = {
  name: string;
  reviewText: string;
  rating: number | null;
  image: string;
};

type Props = { reviews: Review[] };

const ParallaxCarouselReviews: React.FC<Props> = ({ reviews }) => {
  const [expanded, setExpanded] = useState<boolean[]>(() => reviews.map(() => false));

  // reset expansion flags if the reviews list length changes
  useEffect(() => {
    setExpanded(reviews.map(() => false));
  }, [reviews]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__parallax__layer') as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback((emblaApi: EmblaCarouselType) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (!slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) {
          tweenNode.style.transform = `translateX(${translate}%)`;
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax);
  }, [emblaApi, tweenParallax]);

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < rating ? 'text-yellow-500' : 'text-gray-400'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="embla_review">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {reviews.map((rev, index) => (
            <div className="embla__slide flex justify-center px-2" key={index}>
              <div className="embla__parallax">
                <div className="embla__parallax__layer flex flex-col">
                  <div className="bg-[#171717] p-4 rounded-lg flex flex-col gap-3 max-h-[70vh] overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-orange-500/50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-orange-500 text-2xl">{rev.name}</h3>
                      {renderStars(rev.rating)}
                    </div>

                    {rev.image && (
                      <Image
                        src={rev.image}
                        alt={`Slide ${index}`}
                        width={600}
                        height={250}
                        className="embla__slide__img embla__parallax__img mb-4 w-full rounded-lg object-cover max-h-60 md:max-h-72"
                      />
                    )}

                    <p
                      className={`text-white whitespace-pre-line leading-relaxed ${
                        rev.reviewText.length > 150 && !expanded[index] ? 'line-clamp-3' : ''
                      }`}
                    >
                      {rev.reviewText}
                    </p>
                    {rev.reviewText.length > 150 && (
                      <button
                        onClick={() =>
                          setExpanded((prev) =>
                            prev.map((v, i) => (i === index ? !v : v))
                          )
                        }
                        className="mt-1 text-sm text-orange-400 hover:underline self-start"
                      >
                        {expanded[index] ? 'Свернуть' : 'Ещё'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParallaxCarouselReviews;