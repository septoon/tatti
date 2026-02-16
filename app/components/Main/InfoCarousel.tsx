'use client'

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './InfoCarousel.css';

type Props = { videos: string[] };

const InfoCarousel: React.FC<Props> = ({ videos }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' });
  const videosToUse = videos.filter(Boolean);

  if (videosToUse.length === 0) return null;

  return (
    <div className="info-embla">
      <div className="info-embla__viewport" ref={emblaRef}>
        <div className="info-embla__container">
          {videosToUse.map((src, index) => (
            <div className="info-embla__slide" key={index}>
              <div className="info-embla__video-wrap">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="info-embla__video"
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
