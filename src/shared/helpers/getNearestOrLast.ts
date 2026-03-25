import type {StrapiEvent} from "@/types/strapi";

const startOfTodayLocalTs = (now = new Date()) => {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
};

const dateToTs = (isoDate: string | null | undefined) => {
    if (!isoDate) return null;

    const [y, m, d] = isoDate.split("-").map(Number);
    if (!y || !m || !d) return null;

    const ts = Date.UTC(y, m - 1, d, 12, 0, 0, 0);
    return Number.isNaN(ts) ? null : ts;
};

/**
 * Returns nearest upcoming event (>= today), or last event if all are in the past.
 * If input is empty or all dates invalid, returns null.
 */
export const getNearestOrLast = (events: StrapiEvent[]): StrapiEvent[] | null => {
    const todayStartTs = startOfTodayLocalTs();

    const parsed = events
        .map((e) => {
            const ts = dateToTs(e.date);
            return ts === null ? null : ({e, ts});
        })
        .filter((x): x is { e: StrapiEvent; ts: number } => x !== null)
        .sort((a, b) => a.ts - b.ts);

    if (parsed.length === 0) return null;

    const founded = parsed.find((x) => x.ts >= todayStartTs)?.e ?? parsed[parsed.length - 1].e;
    if (!founded) return null;
    return [founded]
};
