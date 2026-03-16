export type StrapiPagination = {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

export type StrapiListResponse<T> = {
    data: T[]
    meta: { pagination: StrapiPagination }
}

export type StrapiLocale = 'pl' | 'en'

export type StrapiEvent = {
    id: number
    documentId: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
    publishedAt: string | null
    locale: string
    date: string | null
    timeStart: string | null
    timeEnd: string | null
}
