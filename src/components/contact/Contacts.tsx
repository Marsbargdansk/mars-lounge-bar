import Link from "next/link";
import {CardTitle} from "@/components/common/CardTitle";
import React from "react";
import {BusinessHour, ContactsPage} from "@/types/strapi";
import {formatShortTime} from "@/shared/helpers/date";

export const Contacts = ({data}: { data: ContactsPage | null }) => {
    console.log('data,', data)
    const phoneHref = `tel:${data?.phone?.value?.replace(/[^\d+]/g, "")}`;
    const emailHref = `mailto:${data?.email?.value}`;

    return (
        <div className="overflow-hidden rounded-[28px] border border-white/10
                bg-black/35 backdrop-blur-md shadow-[0_18px_70px_rgba(0,0,0,0.65)]"
        >
            <div className="p-4 sm:py-10 sm:px-12">
                <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-start sm:justify-between">
                    {/* Title + accent */}
                    <div className="flex flex-col mr-4 sm:mr-12 h-full ">
                        <CardTitle title={data?.pageTitle} className='m-0 sm:m-0 mb-4 text-left'/>

                        <div className="h-px w-16 bg-[#B77A45]/70"/>
                        <p className="mt-5 text-[15px] leading-6 text-white/55">
                            {data?.description}
                        </p>
                        <div className="mt-5  tracking-[0.22em] text-[15px] leading-6 text-white/55">
                            {data?.businessHours?.map((item: BusinessHour, i: number) => {
                                const timeRange = `${formatShortTime(item.startTime)} - ${formatShortTime(item.endTime)}`
                                return (
                                    <p key={i}>{item.label}: {timeRange}</p>
                                )
                            })}
                        </div>
                    </div>

                    {/* Contacts list */}
                    <div className="grid gap-4 md:min-w-[420px]">
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                            <div className="text-[11px] tracking-[0.18em] uppercase text-white/45">
                                {data?.address?.title}
                            </div>
                            <div className="mt-2 text-[14px] text-white/80">{data?.address?.value}</div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-[5fr_8fr]">
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                                <div className="text-[11px] tracking-[0.18em] uppercase text-white/45">
                                    {data?.phone?.title}
                                </div>
                                <Link
                                    href={phoneHref}
                                    className="mt-2 inline-block text-[14px] text-white/80 hover:text-white transition"
                                >
                                    {data?.phone?.value}
                                </Link>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                                <div className="text-[11px] tracking-[0.18em] uppercase text-white/45">
                                    {data?.email?.title}
                                </div>
                                <Link
                                    href={emailHref}
                                    className="mt-2 inline-block text-[14px] text-white/80 hover:text-white transition"
                                >
                                    {data?.email?.value}
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                            <div className="text-[11px] tracking-[0.18em] uppercase text-white/45">
                                {data?.socialsTitle}
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {data?.socials?.map((social) => {
                                    return (
                                        <a
                                            key={social.title}
                                            href={social.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-xl border border-white/10
                              bg-black/20 px-3 py-2 text-[12px] tracking-[0.14em] uppercase
                              text-white/70 hover:text-white hover:bg-white/5 transition"
                                        >
                                            {social.title}
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
