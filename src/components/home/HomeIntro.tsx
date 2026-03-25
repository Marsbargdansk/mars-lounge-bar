'use client'

import Link from "next/link";
import Image from "next/image";
import {useDict} from "@/components/i18n/I18nProvider";
import {tByKey} from "@/shared/helpers/tByKey";
import type {HomePageData} from "@/types/strapi";

export const HOME_INTRO_DATA = {
    primaryCta: {labelKey: "home.intro.buttons.menu", href: "/menu"},
    secondaryCta: {labelKey: "home.intro.buttons.contacts", href: "/contact"},
};
export const HomeIntro = ({data}: { data: HomePageData | null }) => {
    console.log("HomeIntro data", data);
    const {primaryCta, secondaryCta} = HOME_INTRO_DATA;
    const dict = useDict();

    return (
        <div className="relative overflow-hidden rounded-[28px]
            border border-white/10  bg-black/40 shadow-[0_18px_70px_rgba(0,0,0,0.65)]"
        >
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src={data?.heroImage?.url || ''}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="h-full w-full object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-black/55"/>
                <div className="absolute inset-0
                    bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.12),rgba(0,0,0,0.92))]"/>

                {/*<div className="absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full*/}
                {/*    bg-[radial-gradient(circle,rgba(255,170,90,0.25),rgba(255,170,90,0)_60%)] blur-2xl"/>*/}
                <div className="absolute right-10 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full
                bg-[radial-gradient(circle,rgba(255,255,255,0.08),rgba(255,255,255,0)_65%)] blur-3xl"/>
            </div>

            {/* Content */}
            <div className="relative p-6 sm:px-12 sm:py-20">
                <div className="max-w-[560px]">
                    <h1 className="text-[44px] leading-[1.05] tracking-[0.12em] uppercase text-[#E9E2D7] sm:text-[56px]">
                        {data?.heroTitle}
                    </h1>

                    <p className="mt-4 text-[20px] text-white/80 sm:text-[22px]">
                        {data?.heroSubtitle}
                    </p>

                    <p className="mt-6 text-[14px] tracking-[0.12em] text-white/55">
                        {data?.heroDescription}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <Link
                            href={primaryCta.href}
                            className="rounded-xl px-6 py-3 text-[13px] tracking-[0.18em] uppercase
                    border border-[#B77A45]/50 bg-[#3A241A]/60 text-[#E7C19A]
                    hover:bg-[#3A241A]/80 hover:border-[#D39A5D]/60 transition "
                        >
                            {tByKey(dict, primaryCta.labelKey)}
                        </Link>

                        <Link
                            href={secondaryCta.href}
                            className="px-4 py-3 text-[13px] tracking-[0.18em] uppercase
                    text-white/75 hover:text-white hover:bg-white/5 rounded-xl transition"
                        >
                            {tByKey(dict, secondaryCta.labelKey)}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10"/>
        </div>
    );
};
