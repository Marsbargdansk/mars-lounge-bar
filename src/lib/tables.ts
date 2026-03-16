import tables from '@/content/tables.json';
import {TableCardData} from "@/types/table";

export const getTables = (): TableCardData[] => {
    return tables;
};