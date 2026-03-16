'use client'
import {useDict} from "@/components/i18n/I18nProvider";
import {tByKey} from "@/shared/helpers/tByKey";
import {BigCardWrapper} from "@/components/common/BigCardWrapper";
import {AtmosphereSlider} from "@/components/common/AtmosphereSlider";
import {CardTitle} from "@/components/common/CardTitle";
import React from "react";

export const HomeAtmosphere = () => {
    const dict = useDict();

    return (
        <BigCardWrapper>
            <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row w-full px-0 sm:py-10 sm:px-12">
                <div className="w-full sm:w-1/2 flex-col my-auto py-4 px-4 sm:px-0 sm:mr-12">
                    <CardTitle titleKey='home.atmosphere.title' className='m-0 sm:m-0 mb-5 '/>

                    <p className="text-[14px] leading-6 text-white/60 text-center">{tByKey(dict, 'home.atmosphere.text')}</p>
                </div>
                <AtmosphereSlider
                    slides={[
                        {src: '/images/home/atmosphere.jpg', alt: 'Mars lounge interior 1'},
                        {src: '/images/home/atmosphere2.jpg', alt: 'Mars lounge interior 2'},
                        {src: '/images/home/atmosphere3.jpg', alt: 'Mars lounge interior 3'},
                        {src: '/images/home/atmosphere4.jpg', alt: 'Mars lounge interior 4'},
                        {src: '/images/home/atmosphere5.jpg', alt: 'Mars lounge interior 5'},
                        {src: '/images/home/atmosphere6.jpg', alt: 'Mars lounge interior 6'},
                        {src: '/images/home/atmosphere7.jpg', alt: 'Mars lounge interior 7'},
                    ]}
                    className=" w-full max-w-full sm:w-1/2 sm:max-w-1/2"
                />
            </div>
        </BigCardWrapper>

    );
};
