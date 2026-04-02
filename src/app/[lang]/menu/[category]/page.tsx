import type {Metadata} from "next";
import React from "react";
import {MenuItemCard} from "@/components/menu/MenuItemCard";
import {hasLocale} from "@/app/[lang]/dictionaries";
import {tByKey} from "@/shared/helpers/tByKey";
import {MainPageWrapper} from "@/components/common/MainPageWrapper";
import MENU_CATEGORIES from "@/content/menu/categories.json";
import {notFound} from 'next/navigation';
import {getMenuData} from '@/lib/strapi/menu';
import {MenuCategoryWithItems} from "@/types/strapi";

const LOCALES = ["pl", "en"] as const;

export const generateStaticParams = async () => {
    const activeCategoryIds = MENU_CATEGORIES
        .filter((c) => c.isActive)
        .map((c) => c.id);

    return LOCALES.flatMap((lang) =>
        activeCategoryIds.map((category) => ({lang, category}))
    );
};

export type PageProps = {
    params: Promise<{ lang: (typeof LOCALES)[number]; category: string }>;
};

const CATEGORY_SEO: Record<
    string,
    {
        pl: { title: string; description: string };
        en: { title: string; description: string };
    }
> = {
    "craft-cocktails": {
        pl: {
            title: "Craft Cocktails",
            description:
                "Autorskie koktajle w Mars Lounge Bar w Gdańsku — wyjątkowe kompozycje smakowe i premium atmosfera.",
        },
        en: {
            title: "Craft Cocktails",
            description:
                "Signature cocktails at Mars Lounge Bar in Gdańsk — unique flavour combinations and a premium atmosphere.",
        },
    },
    "world-classic": {
        pl: {
            title: "World Classic",
            description:
                "Klasyczne koktajle z całego świata w Mars Lounge Bar w Gdańsku.",
        },
        en: {
            title: "World Classic",
            description:
                "Classic cocktails from around the world at Mars Lounge Bar in Gdańsk.",
        },
    },
    mocktails: {
        pl: {
            title: "Mocktails",
            description:
                "Bezalkoholowe koktajle w Mars Lounge Bar w Gdańsku — pełnia smaku bez alkoholu.",
        },
        en: {
            title: "Mocktails",
            description:
                "Alcohol-free cocktails at Mars Lounge Bar in Gdańsk — full flavour without alcohol.",
        },
    },
    shisha: {
        pl: {
            title: "Shisha",
            description:
                "Shisha w Mars Lounge Bar w Gdańsku — wybrane smaki i lounge atmosfera.",
        },
        en: {
            title: "Shisha",
            description:
                "Shisha at Mars Lounge Bar in Gdańsk — selected flavours and lounge atmosphere.",
        },
    },
    soft: {
        pl: {
            title: "Soft Drinks",
            description:
                "Napoje bezalkoholowe i soft drinks w Mars Lounge Bar w Gdańsku.",
        },
        en: {
            title: "Soft Drinks",
            description:
                "Soft drinks and non-alcoholic beverages at Mars Lounge Bar in Gdańsk.",
        },
    },
    standards: {
        pl: {
            title: "Standards",
            description:
                "Klasyczne propozycje barowe w Mars Lounge Bar w Gdańsku.",
        },
        en: {
            title: "Standards",
            description:
                "Classic bar options at Mars Lounge Bar in Gdańsk.",
        },
    },
    "coffee-tea": {
        pl: {
            title: "Coffee & Tea",
            description:
                "Kawa i herbata w Mars Lounge Bar w Gdańsku.",
        },
        en: {
            title: "Coffee & Tea",
            description:
                "Coffee and tea at Mars Lounge Bar in Gdańsk.",
        },
    },
    snacks: {
        pl: {
            title: "Snacks",
            description:
                "Przekąski w Mars Lounge Bar w Gdańsku — idealne do koktajli i spotkań.",
        },
        en: {
            title: "Snacks",
            description:
                "Snacks at Mars Lounge Bar in Gdańsk — perfect with cocktails and meetings.",
        },
    },
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {lang, category} = await params;

    const currentCategory: MenuCategoryWithItems[] | undefined = await getMenuData(lang, category);
    if (!currentCategory) notFound();

    const fallback = {
        pl: {
            title: "Menu Category",
            description: "Kategoria menu Mars Lounge Bar w Gdańsku.",
        },
        en: {
            title: "Menu Category",
            description: "Menu category at Mars Lounge Bar in Gdańsk.",
        },
    };

    const seo = CATEGORY_SEO[category] ?? fallback;
    const currentSeo = seo[lang];

    return {
        title: currentSeo.title,
        description: currentSeo.description,
        alternates: {
            canonical: `/${lang}/menu/${category}`,
            languages: {
                pl: `/pl/menu/${category}`,
                en: `/en/menu/${category}`,
            },
        },
        openGraph: {
            title: `${currentSeo.title} | Mars Lounge Bar`,
            description: currentSeo.description,
            url: `https://www.mars-lounge.bar/${lang}/menu/${category}`,
        },
    };
}

export default async function MenuCategoryPage({params}: PageProps) {
    const {lang, category} = await params;

    if (!hasLocale(lang)) notFound();
    if (!category) notFound();

    const currentCategory: MenuCategoryWithItems[] | undefined = await getMenuData(lang, category);
    if (!currentCategory) notFound();

    return (
        <MainPageWrapper className="sm:max-w-6xl pt-32">
            <h1 className="mb-2 sm:mb-4 text-[28px] tracking-[0.08em] text-white/85">
                {currentCategory[0].title}
            </h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                {currentCategory[0].menu_items.map((item) => (
                    <MenuItemCard key={item.id} item={item}/>
                ))}
            </div>
        </MainPageWrapper>
    );
}