'use client';

import React, {useMemo} from 'react';
import Link from 'next/link';
import {usePathname} from "next/navigation";
import {getLangPrefix, withLang} from "@/shared/helpers/lang";

export const Footer = () => {
    const brand = 'the MARS lounge'
    const developerName = 'Dev by @yak'
    const url = 'https://www.instagram.com/kind_grandfa/'
    const pathname = usePathname();

    const langPrefix = useMemo(() => getLangPrefix(pathname ?? '/'), [pathname]);

    return (
        <footer className="mt-14 border-t border-white/10">
            <div
                className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 text-[10px] tracking-[0.26em] uppercase text-white/55">
                <Link
                    href={withLang('', langPrefix)}
                    className="flex items-center gap-3 text-white/90 hover:text-white transition"
                    aria-label="Home"
                >
                    <span
                        className="h-2 w-2 rounded-full bg-red-500/90 shadow-[0_0_14px_rgba(239,68,68,0.35)]"
                        aria-hidden
                    />
                    <span>{brand}</span>
                </Link>

                {/* Signature */}
                <div className="flex items-center gap-2">
                    <span className="hidden sm:inline">2026</span>
                    <span className="hidden sm:inline">·</span>
                    <Link
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white/70 transition"
                    >
                        {developerName}
                    </Link>
                </div>
            </div>
        </footer>
    );
};
