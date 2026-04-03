import type {Metadata} from "next";
import {CategoryRow} from "@/components/menu/CategoryRow";
import {getMenuData} from "@/lib/collections/menu";
import {PageProps} from "@/types/page";
import React from "react";
import {MainPageWrapper} from "@/components/common/MainPageWrapper";

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {lang} = await params;
    const isPl = lang === "pl";

    return {
        title: isPl ? "Menu" : "Menu",
        description: isPl
            ? "Menu Mars Lounge Bar w Gdańsku — craft cocktails, klasyki, soft drinks, shisha i przekąski."
            : "Mars Lounge Bar menu in Gdańsk — craft cocktails, classics, soft drinks, shisha and snacks.",
        alternates: {
            canonical: `/${lang}/menu`,
            languages: {
                pl: "/pl/menu",
                en: "/en/menu",
            },
        },
        openGraph: {
            title: isPl ? "Menu | Mars Lounge Bar" : "Menu | Mars Lounge Bar",
            description: isPl
                ? "Menu Mars Lounge Bar w Gdańsku — craft cocktails, klasyki, soft drinks, shisha i przekąski."
                : "Mars Lounge Bar menu in Gdańsk — craft cocktails, classics, soft drinks, shisha and snacks.",
            url: `https://www.mars-lounge.bar/${lang}/menu`,
        },
    };
}

export default async function MenuPage({params}: PageProps) {
    const {lang} = await params;
    const menuData = await getMenuData(lang)

    return (
        <MainPageWrapper className="!px-0 sm:px-4 pt-32">
            {menuData.map(category => {
                if (!category.isActive) return null;

                return (
                    <CategoryRow
                        key={category.id}
                        categoryId={category.slug}
                        title={category.title}
                        items={category.menu_items}
                    />
                );
            })}
        </MainPageWrapper>
    );
}