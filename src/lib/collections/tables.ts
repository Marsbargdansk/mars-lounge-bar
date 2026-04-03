import qs from 'qs'
import {strapiFetch} from '../strapi/strapiFetch'
import {StrapiListResponse, StrapiLocale, StrapiSingleResponse, TableCategory, TablesPageData,} from '@/types/strapi'

export const getTablesPageData = async (locale: StrapiLocale) => {
    const query = qs.stringify(
        {locale},
        {encodeValuesOnly: true}
    )

    const res = await strapiFetch<StrapiSingleResponse<TablesPageData>>(
        `/tables-page?${query}`,
        {
            next: {
                tags: [`tables-page:${locale}`],
            },
        }
    )

    return res.data
}

const getTablesCategory = async (locale: StrapiLocale, slug: string) => {
    const query = qs.stringify(
        {
            locale,
            sort: ['sortOrder:asc'],
            filters: {
                slug: {
                    $eq: slug,
                },
            },
            populate: {
                table_items: {
                    sort: ['sortOrder:asc'],
                    populate: {
                        image: true,
                    },
                },
            },
        },
        {
            encodeValuesOnly: true,
        }
    )

    const res = await strapiFetch<StrapiListResponse<TableCategory>>(
        `/table-categories?${query}`,
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