import {strapiFetch} from './strapiFetch'
import type {ContactsPage, StrapiLocale, StrapiSingleResponse} from '@/types/strapi'

export const getContactData = async (locale: StrapiLocale) => {
    const query = new URLSearchParams({
        locale,
    })

    const res = await strapiFetch<StrapiSingleResponse<ContactsPage>>(
        `/contacts-page?${query.toString()}`,
        {
            next: {
                tags: [`contacts-page:${locale}`],
            },
        }
    )

    return res.data
}