'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {motion} from 'framer-motion';
import clsx from 'clsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

import {LocaleSwitcher} from '@/components/header/LocaleSwitcher';
import type {NavLink} from './navLinks';
import {tByKey} from "@/shared/helpers/tByKey";
import {useDict} from "@/components/i18n/I18nProvider";

type Props = {
    links: NavLink[];
    withLang: (href: string) => string;
    isActive: (href: string) => boolean;
    onClose: () => void;
};

export const MobileNavDrawer = ({links, withLang, isActive, onClose}: Props) => {
    const dict = useDict();
    return (
        <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            className="absolute right-0 top-0 h-full w-[88%] max-w-sm rounded-l-3xl
        border-l border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.75)] overflow-hidden"
            initial={{x: 40, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            exit={{x: 40, opacity: 0}}
            transition={{type: 'spring', stiffness: 260, damping: 28}}
        >
            {/* Background “glass” */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80 backdrop-blur-xl"/>
            {/* Accent glow */}
            <div
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#CFA57A]/18 blur-3xl"
            />
            {/* Subtle highlights */}
            <div
                className="pointer-events-none absolute inset-0
          [background:radial-gradient(900px_500px_at_70%_-10%,rgba(255,255,255,0.10),transparent_60%)]"
            />

            <div className="relative h-full">
                {/* Header row */}
                <div className="flex items-center justify-between px-5 pt-5">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/images/common/mars-logo.png"
                            width={120}
                            height={20}
                            alt="Logo"
                            priority
                            sizes="120px"
                            className="h-[35px] w-auto"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5
              text-white/80 hover:text-white hover:bg-white/10 transition"
                        aria-label="Закрыть"
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-lg"/>
                    </button>
                </div>

                <div className="px-5 pt-4">
                    <div className="h-px w-full bg-white/10"/>
                </div>

                {/* Links */}
                <nav className="px-3 pt-4">
                    <div className="flex flex-col gap-1">
                        {links.map((l) => {
                            const active = isActive(l.href);

                            return (
                                <Link
                                    key={l.href}
                                    href={withLang(l.href)}
                                    className={clsx(
                                        'group relative flex items-center gap-3 rounded-2xl px-4 py-3 transition',
                                        active ? 'bg-white/8' : 'hover:bg-white/7',
                                    )}
                                >
                                    {/* active bar */}
                                    <span
                                        className={clsx(
                                            'absolute left-0 top-2 bottom-2 w-[3px] rounded-full',
                                            active ? 'bg-[#CFA57A]/90' : 'bg-transparent',
                                        )}
                                    />

                                    <span
                                        className={clsx(
                                            'text-[13px] tracking-[0.16em] uppercase',
                                            active ? 'text-white' : 'text-white/78 group-hover:text-white',
                                        )}
                                    >
                                        {tByKey(dict, l.titleKey)}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="px-2 pt-4">
                        <div className="h-px w-full bg-white/10"/>
                    </div>

                    <div className="px-2 pt-4">
                        <div
                            className="rounded-2xl border border-white/10 bg-white/5 p-3 flex items-center justify-between gap-3">
                            <div className="text-[11px] tracking-[0.22em] uppercase text-white/60">
                                {tByKey(dict, 'navigation.language')}
                            </div>
                            <LocaleSwitcher/>
                        </div>
                    </div>
                </nav>

                {/* Bottom fade */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent"/>
            </div>
        </motion.div>
    );
};
