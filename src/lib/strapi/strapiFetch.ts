export type StrapiFetchOptions = RequestInit & {
    next?: {
        revalidate?: number;
        tags?: string[];
    };
};

const getStrapiUrl = () => {
    const url = process.env.STRAPI_URL
    if (!url) throw new Error('STRAPI_URL is not set')
    return url.replace(/\/$/, '')
}

const getStrapiToken = () => {
    const token = process.env.STRAPI_API_TOKEN
    if (!token) throw new Error('STRAPI_API_TOKEN is not set')
    return token
}

export const strapiFetch = async <T>(
    path: string,
    options: StrapiFetchOptions = {}
): Promise<T> => {
    const baseUrl = getStrapiUrl()
    const token = getStrapiToken()

    const res = await fetch(`${baseUrl}/api${path}`, {
        ...options,
        headers: {
            ...(options.headers ?? {}),
            Authorization: `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        const body = await res.text().catch(() => '')
        throw new Error(`Strapi ${res.status} ${res.statusText}: ${body}`)
    }

    return (await res.json()) as T
}
