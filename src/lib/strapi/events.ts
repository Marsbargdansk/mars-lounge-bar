import {strapiFetch} from './strapiFetch'
import type {StrapiEvent, StrapiListResponse, StrapiLocale} from '@/types/strapi'


export const getEvents = async (locale: StrapiLocale, sort = 'date:asc') => {
    const query = new URLSearchParams({locale, sort})

    const res = await strapiFetch<StrapiListResponse<StrapiEvent>>(
        `/events?${query.toString()}`,
        {next: {tags: [`events:${locale}`]}}
    )

    return res.data.filter((e) => e.publishedAt)
}
