import type {MetadataRoute} from 'next';
import {getMenuCategories} from '@/lib/collections/menu';

const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mars-lounge.bar';

const locales = ['pl', 'en'] as const;
const staticPages = ['', 'menu', 'tables', 'happenings', 'contact'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const categoriesByLocale = await Promise.all(
        locales.map(async (lang) => ({
            lang,
            categories: await getMenuCategories(lang),
        }))
    );

    return categoriesByLocale.flatMap(({lang, categories}) => [
        ...staticPages.map((page) => ({
            url: page ? `${baseUrl}/${lang}/${page}` : `${baseUrl}/${lang}`,
            lastModified: now,
        })),

        ...categories.map((category) => ({
            url: `${baseUrl}/${lang}/menu/${category.slug}`,
            lastModified: now,
        })),
    ]);
}