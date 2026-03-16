export type MenuCategory = {
    id: string;
    titleKey: string;
    order: number;
    isActive: boolean;
};

export type MenuItem = {
    id: string;
    categoryId: string;
    price: {
        amount: number;
        currency: string;
    };
    nameKey: string;
    descriptionKey?: string;
    volumeMl?: number;
    isActive: boolean;
    order: number;
};
