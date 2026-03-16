import categories from '@/content/menu/categories.json';
import menuItems from '@/content/menu/items.json';

export const getMenuCategories = () => {
    return categories;
};
export const getMenuCategoryById = (category: string) => {
    return categories.find(cat => cat.id === category);
};
export const getAllMenuItems = () => {
    return menuItems;
};
export const getMenuItemsByCategoryId = (id: string) => {
    return menuItems.filter(item => item.categoryId === id);
};