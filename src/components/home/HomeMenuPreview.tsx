'use client'
import Link from "next/link";
import {HOME_MENU_PREVIEW_DATA} from "./homeMenuPreviewData";
import {DirectionalLink} from "@/components/common/DirectionalLink";
import React, {useMemo} from "react";
import Image from "next/image";
import {useDict} from "@/components/i18n/I18nProvider";
import {tByKey} from "@/shared/helpers/tByKey";
import {usePathname} from "next/navigation";
import {getLangPrefix, withLang} from "@/shared/helpers/lang";
import {CardTitle} from "@/components/common/CardTitle";

export const HomeMenuPreview = () => {
    const {viewAll, items} = HOME_MENU_PREVIEW_DATA;
    const dict = useDict();
    const pathname = usePathname();
    const langPrefix = useMemo(() => getLangPrefix(pathname ?? '/'), [pathname]);
    return (
        <section className="py-7 sm:py-14">
            <CardTitle titleKey='home.menuPreview.title'/>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((it) => (
                    <Link
                        key={it.href}
                        href={withLang(it.href, langPrefix)}
                        className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-black/25
                shadow-[0_18px_70px_rgba(0,0,0,0.65)] transition hover:border-white/15">
                        <div className="absolute inset-0">
                            <Image
                                src={it.imageUrl}
                                width={400}
                                height={425}
                                alt=""
                                className="object-contain opacity-90 transition duration-500"
                            />
                            <div
                                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.10),rgba(0,0,0,0.92))]"/>
                        </div>

                        <div className="relative flex h-[270px] items-end p-5">
                            <div className="w-full">
                                <div className="text-[20px] tracking-[0.12em] text-white/85">
                                    {tByKey(dict, it.labelKey)}
                                </div>
                                <div className="mt-1 h-px w-12 bg-[#B77A45]/70"/>
                            </div>
                        </div>

                        <div className="pointer-events-none absolute inset-2 rounded-[18px] border border-white/5"/>
                    </Link>
                ))}
            </div>

            <div className="mt-2 sm:mt-4 flex justify-center">
                <DirectionalLink href={viewAll.href} title={tByKey(dict, viewAll.labelKey) + ' →'}/>
            </div>
        </section>
    );
};
