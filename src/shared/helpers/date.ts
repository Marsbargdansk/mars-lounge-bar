export const formatShortDate = (isoDate: string | null): string => {
    if (!isoDate) return ''

    const [year, month, day] = isoDate.split('-')

    if (!year || !month || !day) return ''

    return `${day}.${month}`
}

type StrapiTime = string | null | undefined
export const formatShortTime = (time: StrapiTime): string => {
    if (!time) return ''

    const [hours, minutes] = time.split(':')

    if (!hours || !minutes) return ''

    return `${hours}:${minutes}`
}

export const buildTimeRange = (start: StrapiTime, end: StrapiTime): string => {
    if (!start || !end) return ''
    return `${formatShortTime(start)}-${formatShortTime(end)}`
}
