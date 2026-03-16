import {SpecialsData} from "@/lib/happenings";

const WEEK_DAYS_INDEX: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
};

export const getNearestDay = (items: SpecialsData[]): SpecialsData => {
    const todayIndex = new Date().getDay();

    const withDistance = items
        .map((item) => {
            const dayIndex = WEEK_DAYS_INDEX[item.day.toLowerCase()];
            if (dayIndex === undefined) return null;

            const diff =
                dayIndex >= todayIndex
                    ? dayIndex - todayIndex
                    : 7 - todayIndex + dayIndex;

            return { item, diff };
        })
        .filter(
            (v): v is { item: SpecialsData; diff: number } => v !== null
        );
    withDistance.sort((a, b) => a.diff - b.diff);

    return withDistance[0].item;
};
