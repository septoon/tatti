'use client'

import React, { useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './InfoCarousel.css';

type Props = { videos: string[] };

const InfoCarousel: React.FC<Props> = ({ videos }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const videosToUse = videos.filter(Boolean);

  const syncActiveVideo = useCallback(() => {
    if (!emblaApi || videosToUse.length === 0) return;

    const activeIndex = emblaApi.selectedScrollSnap();

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise) {
          playPromise.catch(() => undefined);
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [emblaApi, videosToUse.length]);

  useEffect(() => {
    if (!emblaApi || videosToUse.length === 0) return;

    syncActiveVideo();
    emblaApi.on('select', syncActiveVideo);
    emblaApi.on('reInit', syncActiveVideo);

    return () => {
      emblaApi.off('select', syncActiveVideo);
      emblaApi.off('reInit', syncActiveVideo);
    };
  }, [emblaApi, syncActiveVideo, videosToUse.length]);

  const handleVideoEnded = useCallback((index: number) => {
    if (!emblaApi) return;
    if (emblaApi.selectedScrollSnap() !== index) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  if (videosToUse.length === 0) return null;

  return (
    <div className="info-embla">
      <div className="info-embla__viewport" ref={emblaRef}>
        <div className="info-embla__container">
          {videosToUse.map((src, index) => (
            <div className="info-embla__slide" key={index}>
              <div className="info-embla__video-wrap">
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  muted
                  playsInline
                  preload="none"
                  className="info-embla__video"
                  onEnded={() => handleVideoEnded(index)}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                >
                  <source src={src} type="video/mp4" />
                </video>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCarousel;