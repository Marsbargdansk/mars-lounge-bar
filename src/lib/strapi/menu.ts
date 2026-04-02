import {strapiFetch} from './strapiFetch';
import type {MenuCategory, MenuCategoryWithItems, MenuItem, StrapiListResponse, StrapiLocale,} from '@/types/strapi';

export const getMenuCategories = async (locale: StrapiLocale) => {
    const query = new URLSearchParams({
        locale,
        // sort: 'titleEn:asc',
        'filters[isActive][$eq]': 'true',
    });

    const res = await strapiFetch<StrapiListResponse<MenuCategory>>(
        `/menu-categories?${query.toString()}`,
        {
            next: {
                tags: [`menu-categories:${locale}`],
            },
        }
    );

    return res.data;
};

export const getMenuItems = async (
    locale: StrapiLocale,
    categorySlug?: string
) => {
    const query = new URLSearchParams({
        locale,
        sort: 'title:asc',
        'filters[isActive][$eq]': 'true',
        'populate[0]': 'image',
        'populate[1]': 'category',
    });

    if (categorySlug) {
        query.set('filters[category][slug][$eq]', categorySlug);
    }

    const res = await strapiFetch<StrapiListResponse<MenuItem>>(
        `/menu-items?${query.toString()}`,
        {
            next: {
                tags: [
                    `menu-items:${locale}`,
                    ...(categorySlug ? [`menu-items:${locale}:category:${categorySlug}`] : []),
                ],
            },
        }
    );

    return res.data;
};

export const getMenuData = async (
    locale: StrapiLocale,
    categorySlug?: string
): Promise<MenuCategoryWithItems[]> => {
    const [categories, items] = await Promise.all([
        getMenuCategories(locale),
        getMenuItems(locale, categorySlug),
    ]);

    const filteredCategories = categorySlug
        ? categories.filter((category) => category.slug === categorySlug)
        : categories;

    return filteredCategories.map((category) => ({
        ...category,
        menu_items: items.filter((item) => item.category?.slug === category.slug),
    }));
};