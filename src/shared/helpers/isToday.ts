const WEEK_DAYS: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
};

export const isToday = (day: string): boolean => {
    const todayIndex = new Date().getDay();
    const dayIndex = WEEK_DAYS[day.toLowerCase()];

    if (dayIndex === undefined) return false;

    return todayIndex === dayIndex;
};
