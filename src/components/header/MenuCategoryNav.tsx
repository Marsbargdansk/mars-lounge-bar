'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import clsx from 'clsx'
import {motion} from 'framer-motion'
import {MenuCategory} from '@/types/strapi'
import React from 'react'
import {Locale} from "@/types/lang";

type NavItemProps = {
    lang: Locale
    activeSlug: string | null
    category: MenuCategory
    itemRef?: React.RefObject<HTMLAnchorElement | null>
}

const NavItem = ({category, lang, activeSlug, itemRef}: NavItemProps) => {
    const href = `/${lang}/menu/${category.slug}`
    const isActive = activeSlug === category.slug

    return (
        <Link
            ref={isActive ? itemRef : undefined}
            href={href}
            className={clsx(
                'relative shrink-0 whitespace-nowrap p-2 rounded-full text-sm tracking-wide transition-all duration-300',
                'bg-black/35 border border-white/10 backdrop-blur-md',
                isActive
                    ? 'text-[#CFA57A]'
                    : 'text-white/60 hover:text-white'
            )}
        >
            <span className="relative z-10">{category.title}</span>

            {isActive && (
                <motion.span
                    layoutId="activeMenuCategory"
                    className="absolute inset-0 rounded-full border border-[#CFA57A]/40 bg-[#CFA57A]/10"
                    transition={{type: 'spring', stiffness: 320, damping: 30}}
                />
            )}
        </Link>
    )
}

type MenuCategoryNavProps = {
    lang: Locale,
    categories: MenuCategory[]
}

export const MenuCategoryNav = ({lang, categories}: MenuCategoryNavProps) => {
    const pathname = usePathname()
    const activeItemRef = React.useRef<HTMLAnchorElement | null>(null)

    const activeSlug =
        pathname?.match(new RegExp(`^/${lang}/menu/([^/?#]+)`))?.[1] ?? null

    React.useEffect(() => {
        if (!activeItemRef.current) return

        activeItemRef.current.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
        })
    }, [activeSlug])

    return (
        <div
            className={clsx(
                'flex w-full items-center justify-start px-4',
                'gap-2 overflow-x-auto snap-x snap-mandatory scroll-px-4',
                '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            )}
        >
            {categories.map((category) => (
                <NavItem
                    key={category.id}
                    category={category}
                    activeSlug={activeSlug}
                    lang={lang}
                    itemRef={activeItemRef}
                />
            ))}
        </div>
    )
}