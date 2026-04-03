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
export type StrapiSingleResponse<T> = {
    data: T | null
    meta?: Record<string, unknown>
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

export type StrapiMedia = {
    id: number
    name: string
    alternativeText: string | null
    width: number | null
    height: number | null
    url: string
}

export type HomePageData = {
    id: number
    heroTitle: string
    heroSubtitle: string
    heroDescription: string
    heroImage: StrapiMedia | null
    atmosphereTitle: string
    atmosphereDescription: string
    atmosphereGallery: StrapiMedia[]
    menuPreviewTitle: string
    locale: StrapiLocale
}
export type ContactField = {
    id: number
    title: string
    value: string
}

export type SocialItem = {
    id: number
    title: string
    url: string
}

export type BusinessHour = {
    id: number
    label: string
    startTime: string
    endTime: string
}

export type ContactsPage = {
    id: number
    documentId: string
    locale: StrapiLocale
    pageTitle: string
    description: string
    mapEmbedUrl: string
    businessHours: BusinessHour[]
    address: ContactField
    phone: ContactField
    email: ContactField
    socialsTitle: string
    socials: SocialItem[]
    publishedAt: string | null
    createdAt: string
    updatedAt: string
}

export type TableItem = {
    id: number
    documentId: string
    title: string
    capacity: number
    extraInfo: string | null
    priceWeekdays: string | null
    priceWeekend: string | null
    isActive: boolean
    image: StrapiMedia | null
    locale: StrapiLocale
    createdAt: string
    updatedAt: string
    publishedAt: string | null
}

export type TableCategory = {
    id: number
    documentId: string
    title: string
    slug: string
    table_items: TableItem[]
    locale: StrapiLocale
    createdAt: string
    updatedAt: string
    publishedAt: string | null
}

export type TablesPageData = {
    id: number
    documentId: string
    noticeText: string
    seoTitle: string | null
    seoDescription: string | null
    locale: StrapiLocale
    createdAt: string
    updatedAt: string
    publishedAt: string | null
}
export type MenuItemCategory = {
    id: number
    documentId: string
    title: string
    slug: string
    isActive: boolean
    locale: StrapiLocale
    createdAt: string
    updatedAt: string
    publishedAt: string | null
}

export type MenuItem = {
    id: number
    documentId: string
    title: string
    description: string | null
    volume: number | null
    price: number | null
    unit: string | null
    isActive: boolean
    image: StrapiMedia | null
    category: MenuItemCategory | null
    locale: StrapiLocale
    createdAt: string
    updatedAt: string
    publishedAt: string | null
}

export type MenuCategory = {
    id: number
    documentId: string
    title: string
    slug: string
    isActive: boolean
    locale: StrapiLocale
    createdAt: string
    updatedAt: string
    publishedAt: string | null
}

export type MenuCategoryWithItems = MenuCategory & {
    menu_items: MenuItem[]
}
export type SpecialOffer = {
    id: number;
    documentId: string;
    title: string;
    description: string;
    day: string;
    slug: string;
    sortOrder: number;
    locale: StrapiLocale;
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
};