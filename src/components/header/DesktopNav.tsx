'use client'
import React from 'react';
import Link from 'next/link';
import {LocaleSwitcher} from '@/components/header/LocaleSwitcher';
import type {NavLink} from './navLinks';
import {useDict} from "@/components/i18n/I18nProvider";
import {tByKey} from "@/shared/helpers/tByKey";

type Props = {
    links: NavLink[];
    navWithLang: (href: string) => string;
};

export const DesktopNav = ({links, navWithLang}: Props) => {
    const dict = useDict();
    return (
        <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
                <Link
                    key={l.href}
                    href={navWithLang(l.href)}
                    className="rounded-xl px-3 py-2 text-[12px] tracking-[0.18em] uppercase
            text-white/70 hover:text-white hover:bg-white/5 transition"
                >
                    {tByKey(dict, l.titleKey)}
                </Link>
            ))}
            <div className="mx-2 hidden h-6 w-px bg-white/10 md:block"/>
            <LocaleSwitcher/>
        </nav>
    );
};
