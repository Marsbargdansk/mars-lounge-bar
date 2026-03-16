'use client';

import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Locale, locales} from "@/types/lang";
import {buildLocalePath, getCurrentLocale} from "@/shared/helpers/lang";

type LocaleSwitchItemProps = {
    locale: Locale;
    isActive: boolean;
    href: string;
};

const LocaleSwitchItem = ({locale, isActive, href}: LocaleSwitchItemProps) => {
    const content = (
        <>
            {isActive && (
                <span
                    className={clsx(
                        'absolute inset-0 rounded-full bg-[rgba(120,84,52,0.6)]',
                        'ring-1 ring-[rgba(160,120,80,0.45)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]'
                    )}
                />
            )}

            <span
                className={clsx(
                    'relative z-10 flex h-full items-center justify-center',
                    'text-[12px] font-light uppercase',
                    'tracking-[0.22em]',
                    isActive ? 'text-white' : 'text-white/55'
                )}
            >
                {locale}
            </span>
        </>
    );

    if (isActive) {
        return <div className="relative h-full">{content}</div>;
    }

    return (
        <Link
            href={href}
            className="relative h-full focus:outline-none"
            aria-label={`Switch language to ${locale}`}
        >
            {content}
        </Link>
    );
};


export const LocaleSwitcher = () => {
    const pathname = usePathname();
    const currentLocale = getCurrentLocale(pathname);

    return (
        <div
            role="navigation"
            aria-label="Language switcher"
            className={clsx(
                'relative inline-flex items-center h-8 w-[92px] rounded-full p-0.5',
                'border border-white/20 bg-white/5 backdrop-blur-md select-none'
            )}
        >
            <div className="grid h-full w-full grid-cols-2 gap-0.5">
                {locales.map((locale) => (
                    <LocaleSwitchItem
                        key={locale}
                        locale={locale}
                        isActive={locale === currentLocale}
                        href={buildLocalePath(pathname, locale)}
                    />
                ))}
            </div>
        </div>
    );
};
