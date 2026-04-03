import qs from 'qs'
import {strapiFetch} from '../strapi/strapiFetch'
import {StrapiLocale, StrapiSingleResponse, TablesPageData,} from '@/types/strapi'

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

