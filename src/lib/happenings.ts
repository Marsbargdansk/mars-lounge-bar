import specials from '@/content/specials.json';

export type SpecialsData = {
    id: string;
    day: string;
};

export const getSpecials = (): SpecialsData[] => {
    return specials;
};
