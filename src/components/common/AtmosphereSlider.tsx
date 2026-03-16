'use client';

import Image from 'next/image';
import {Swiper, SwiperSlide} from 'swiper/react';
import {A11y, Autoplay, Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {CSSProperties} from "react";

type Slide = {
    src: string;
    alt: string;
};

type Props = {
    slides: Slide[];
    className?: string;
};

export const AtmosphereSlider = ({slides, className}: Props) => {
    const defColor = 'rgba(207,165,122,0.6)'
    return (
        <div className={className}>
            <Swiper
                modules={[Pagination, A11y, Autoplay]}
                navigation
                pagination={{clickable: true}}
                loop
                autoplay={{delay: 4500, disableOnInteraction: false}}
                spaceBetween={16}
                slidesPerView={1}
                style={{
                    // стрелки
                    '--swiper-navigation-color': defColor,
                    // активная точка
                    '--swiper-pagination-color': defColor,
                    // неактивные точки
                    '--swiper-pagination-bullet-inactive-color': defColor,
                    '--swiper-pagination-bullet-inactive-opacity': '0.35',
                } as CSSProperties}
            >
                {slides.map((s) => (
                    <SwiperSlide key={s.src}>
                        <div className={`relative w-full overflow-hidden rounded-2xl aspect-[16/9]`}>
                            <Image
                                src={s.src}
                                alt={s.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 800px"
                                className="object-cover"
                                priority={false}
                            />
                            {/* мягкая барная затемнялка */}
                            <div className="pointer-events-none absolute inset-0 bg-black/35"/>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
