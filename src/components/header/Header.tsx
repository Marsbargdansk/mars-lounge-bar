'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {usePathname} from 'next/navigation';
import {AnimatePresence, motion} from 'framer-motion';

import type {NavLink} from './navLinks';
import {NAV_LINKS} from './navLinks';

import {HeaderShell} from './HeaderShell';
import {HeaderLogo} from './HeaderLogo';
import {DesktopNav} from './DesktopNav';
import {MobileMenuButton} from './MobileMenuButton';
import {MobileNavOverlay} from './MobileNavOverlay';
import {MobileNavDrawer} from './MobileNavDrawer';
import {getCurrentLocale, withLang} from "@/shared/helpers/lang";
import {MenuCategoryNav} from "@/components/header/MenuCategoryNav";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((v) => !v);

    // close on route change
    useEffect(() => {
        close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // close on Esc
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    // lock body scroll
    useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen]);

    const getLangPrefix = (path: string) => {
        // expects /en/... or /pl/... etc (app/[lang]/...)
        const m = path.match(/^\/([^/]+)(\/|$)/);
        const maybeLang = m?.[1];
        return maybeLang ? `/${maybeLang}` : '';
    };

    const langPrefix = useMemo(() => getLangPrefix(pathname ?? '/'), [pathname]);


    const isActive = (href: NavLink['href']) => {
        const full = withLang(href, langPrefix);

        // Home
        if (full === `${langPrefix}/`) return pathname === `${langPrefix}/`;

        // exact or nested: /en/menu or /en/menu/xxx
        return pathname === full || !!pathname?.startsWith(`${full}/`);
    };

    const currentLocale = getCurrentLocale(pathname);
    const isInMenu = pathname.includes('menu');

    const navWithLang = (href: string) => withLang(href, langPrefix)
    return (
        <header className="fixed left-0 top-0 z-50 w-full">
            <div className="mx-auto max-w-5xl pt-4 space-y-3">
                <HeaderShell className='mx-4'>
                    <HeaderLogo href={withLang('', langPrefix)}/>

                    <div className="flex items-center gap-2 pr-2">
                        <DesktopNav links={NAV_LINKS} navWithLang={navWithLang}/>
                        <MobileMenuButton isOpen={isOpen} onToggle={toggle}/>
                    </div>
                </HeaderShell>
                {isInMenu && <MenuCategoryNav lang={currentLocale}/>}
            </div>

            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        className="fixed inset-0 z-50 md:hidden"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        aria-hidden={!isOpen}
                    >
                        <MobileNavOverlay onClose={close}/>

                        <MobileNavDrawer
                            links={NAV_LINKS}
                            withLang={navWithLang}
                            isActive={isActive}
                            onClose={close}
                        />
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </header>
    );
};
