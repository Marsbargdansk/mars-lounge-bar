import qs from 'qs';
import {strapiFetch} from '../strapi/strapiFetch';
import type {MenuCategory, MenuCategoryWithItems, MenuItem, StrapiListResponse, StrapiLocale,} from '@/types/strapi';

export const getMenuCategories = async (locale: StrapiLocale) => {
    const query = qs.stringify(
        {
            locale,
            sort: ['sortOrder:asc'],
            filters: {
                isActive: {
                    $eq: true,
                },
            },
        },
        {
            encodeValuesOnly: true,
        }
    );

    const res = await strapiFetch<StrapiListResponse<MenuCategory>>(
        `/menu-categories?${query}`,
        {
            next: {
                tags: [`menu-categories:${locale}`],
            },
        }
    );

    return res.data;
};

type GetMenuItemsResponse = StrapiListResponse<MenuItem>;

export const getMenuItems = async (
    locale: StrapiLocale,
    categorySlug?: string
) => {
    const pageSize = 100;
    let page = 1;
    let pageCount = 1;
    const allItems: MenuItem[] = [];

    do {
        const query = qs.stringify(
            {
                locale,
                sort: ['sortOrder:asc'],
                filters: {
                    isActive: {
                        $eq: true,
                    },
                    ...(categorySlug
                        ? {
                            category: {
                                slug: {
                                    $eq: categorySlug,
                                },
                            },
                        }
                        : {}),
                },
                populate: ['image', 'category'],
                pagination: {
                    page,
                    pageSize,
                },
            },
            {
                encodeValuesOnly: true,
            }
        );

        const res = await strapiFetch<GetMenuItemsResponse>(
            `/menu-items?${query}`,
            {
                next: {
                    tags: [
                        `menu-items:${locale}`,
                        ...(categorySlug
                            ? [`menu-items:${locale}:category:${categorySlug}`]
                            : []),
                    ],
                },
            }
        );

        allItems.push(...res.data);
        pageCount = res.meta.pagination.pageCount;
        page += 1;
    } while (page <= pageCount);

    return allItems;
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