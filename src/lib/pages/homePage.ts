import {strapiFetch} from '../strapi/strapiFetch'
import type {HomePageData, StrapiLocale, StrapiSingleResponse} from '@/types/strapi'


export const getHomeData = async (locale: StrapiLocale) => {
    const query = new URLSearchParams({locale})

    const res = await strapiFetch<StrapiSingleResponse<HomePageData>>(
        `/home?${query.toString()}`
    )

    return res.data
}
