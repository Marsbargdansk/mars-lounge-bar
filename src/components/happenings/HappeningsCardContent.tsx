'use client'
import {useDict} from "@/components/i18n/I18nProvider";
import {tByKey} from "@/shared/helpers/tByKey";
import React from "react";
import clsx from "clsx";


type HappeningsCardContentProps = {
    isToday?: boolean | undefined;
    date?: string | undefined | null;
    dayKey?: string;
    title: string;
    meta?: string | null;
    description?: string;
};
export const HappeningsCardContent = ({
                                          date,
                                          dayKey,
                                          title,
                                          meta,
                                          isToday,
                                          description,
                                      }: HappeningsCardContentProps) => {
    const dict = useDict();
    return (
        <div className="relative flex h-full flex-col justify-end p-5 sm:h-full">
            <div className="flex items-center justify-between gap-3">
                <div className="text-[12px] tracking-[0.26em] uppercase text-white/70">
                    {date || tByKey(dict, dayKey)}
                </div>

                {meta || isToday ? (
                    <div
                        className={clsx("rounded-full px-3 py-1 text-[11px] tracking-[0.22em] uppercase",
                            "border border-[#B77A45]/35 bg-[#B77A45]/10 text-[#E6B07C]")}
                    >
                        {meta || tByKey(dict, 'happenings.today')}
                    </div>
                ) : null}
            </div>

            <div className="mt-3">
                <div className="text-[20px] leading-[1.15] tracking-[0.06em] text-white/88">
                    {title}
                </div>

                {description ? (
                    <div className="mt-2 max-w-full text-[13px] leading-[1.55] text-white/65">
                        {description}
                    </div>
                ) : null}

                <div className="mt-4 h-px w-12 bg-[#B77A45]/70"/>
            </div>

            {/* inner stroke */}
            <div className="pointer-events-none absolute inset-2 rounded-[18px] border border-white/5"/>

            {/* corner glow */}
            <div
                className={clsx("pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl bg-[#B77A45]/18")}
            />
        </div>
    );
};

