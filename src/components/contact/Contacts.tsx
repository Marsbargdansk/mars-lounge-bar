'use client'
import Link from "next/link";
import {getContactsInfo} from "@/lib/contacts";
import {useDict} from "@/components/i18n/I18nProvider";
import {tByKey} from "@/shared/helpers/tByKey";
import {CardTitle} from "@/components/common/CardTitle";
import React from "react";

export const Contacts = () => {
    const contactsInfo = getContactsInfo()
    const dict = useDict();

    const {address, phone, email, socials} = contactsInfo;
    const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
    const emailHref = `mailto:${email}`;

    return (
        <div className="overflow-hidden rounded-[28px] border border-white/10
                bg-black/35 backdrop-blur-md shadow-[0_18px_70px_rgba(0,0,0,0.65)]"
        >
            <div className="p-4 sm:py-10 sm:px-12">
                <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-start sm:justify-between">
                    {/* Title + accent */}
                    <div className="flex flex-col mr-4 sm:mr-12 h-full ">
                        <CardTitle titleKey='contacts.title' className='m-0 sm:m-0 mb-4 text-left'/>

                        <div className="h-px w-16 bg-[#B77A45]/70"/>
                        <p className="mt-5 text-[15px] leading-6 text-white/55">
                            {tByKey(dict, 'contacts.text')}
                        </p>
                        <div className="mt-5  tracking-[0.22em] text-[15px] leading-6 text-white/55">
                            <p>{tByKey(dict, 'contacts.monday')} - {tByKey(dict, 'contacts.thursday')}: 16:00 -
                                00:00</p>
                            <p>{tByKey(dict, 'contacts.friday')} - {tByKey(dict, 'contacts.saturday')}: 16:00 - 03:00</p>
                            <p>{tByKey(dict, 'contacts.sunday')}: 16:00 - 02:00</p>
                        </div>
                    </div>

                    {/* Contacts list */}
                    <div className="grid gap-4 md:min-w-[420px]">
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                            <div className="text-[11px] tracking-[0.18em] uppercase text-white/45">
                                {tByKey(dict, 'contacts.address')}
                            </div>
                            <div className="mt-2 text-[14px] text-white/80">{address}</div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-[5fr_8fr]">
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                                <div className="text-[11px] tracking-[0.18em] uppercase text-white/45">
                                    {tByKey(dict, 'contacts.phone')}
                                </div>
                                <Link
                                    href={phoneHref}
                                    className="mt-2 inline-block text-[14px] text-white/80 hover:text-white transition"
                                >
                                    {phone}
                                </Link>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                                <div className="text-[11px] tracking-[0.18em] uppercase text-white/45">
                                    {tByKey(dict, 'contacts.email')}
                                </div>
                                <Link
                                    href={emailHref}
                                    className="mt-2 inline-block text-[14px] text-white/80 hover:text-white transition"
                                >
                                    {email}
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                            <div className="text-[11px] tracking-[0.18em] uppercase text-white/45">
                                {tByKey(dict, 'contacts.socials.title')}
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {socials.map((s) => {
                                    return (
                                        <a
                                            key={s.type}
                                            href={s.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-xl border border-white/10
                              bg-black/20 px-3 py-2 text-[12px] tracking-[0.14em] uppercase
                              text-white/70 hover:text-white hover:bg-white/5 transition"
                                        >
                                            {tByKey(dict, `contacts.socials.${s.type}`)}
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
