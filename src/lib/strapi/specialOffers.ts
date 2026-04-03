import qs from 'qs'
import {strapiFetch} from './strapiFetch'
import type {SpecialOffer, StrapiListResponse, StrapiLocale} from '@/types/strapi'

export const getSpecialOffers = async (
    locale: StrapiLocale,
    sort = 'sortOrder:asc'
) => {
    const query = qs.stringify(
        {locale, sort},
        {encodeValuesOnly: true}
    )

    const res = await strapiFetch<StrapiListResponse<SpecialOffer>>(
        `/special-offers?${query}`,
        {next: {tags: [`special-offers:${locale}`]}}
    )

    return res.data.filter((item) => item.publishedAt)
}