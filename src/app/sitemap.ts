import type {MetadataRoute} from 'next';
import MENU_CATEGORIES from '@/content/menu/categories.json';

const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.mars-lounge.bar';

const locales = ['pl', 'en'];
const staticPages = ['', 'menu', 'tables', 'happenings', 'contact'];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return locales.flatMap((lang) => [
        // обычные страницы
        ...staticPages.map((page) => ({
            url: page
                ? `${baseUrl}/${lang}/${page}`
                : `${baseUrl}/${lang}`,
            lastModified: now,
        })),

        // категории меню (ТОЛЬКО активные)
        ...MENU_CATEGORIES
            .filter((c) => c.isActive)
            .map((category) => ({
                url: `${baseUrl}/${lang}/menu/${category.id}`,
                lastModified: now,
            })),
    ]);
}
