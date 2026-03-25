import {strapiFetch} from './strapiFetch'
import {
    StrapiListResponse,
    StrapiLocale,
    StrapiSingleResponse,
    TableCategory,
    TablesPageData
} from '@/types/strapi'

export const getTablesPageData = async (locale: StrapiLocale) => {
    const query = new URLSearchParams({ locale })

    const res = await strapiFetch<StrapiSingleResponse<TablesPageData>>(
        `/tables-page?${query.toString()}`,
        {
            next: {
                tags: [`tables-page:${locale}`],
            },
        }
    )

    return res.data
}

const getTablesCategory = async (locale: StrapiLocale, slug: string) => {
    const query = new URLSearchParams({
        locale,
        'filters[slug][$eq]': slug,
        'populate[table_items][populate]': 'image',
    })

    const res = await strapiFetch<StrapiListResponse<TableCategory>>(
        `/table-categories?${query.toString()}`,
        {
            next: {
                tags: [`table-category:${locale}`, `table-category:${locale}:${slug}`],
            },
        }
    )

    return res.data[0] ?? null
}

export const getTablesRegular = async (locale: StrapiLocale) => {
    return getTablesCategory(locale, 'regular')
}

export const getTablesZones = async (locale: StrapiLocale) => {
    return getTablesCategory(locale, 'zones')
}