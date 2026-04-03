import React from "react";
import {TableCard} from "./TableCard";
import clsx from "clsx";
import {Locale} from "@/types/lang";
import {getTablesRegular, getTablesZones} from "@/lib/collections/tables";
import {getTablesPageData} from "@/lib/pages/tablePage";
import {TableItem} from "@/types/strapi";

const Section = ({items, className}: { items: TableItem[]; className: string }) => {
    if (!items.length) return null;

    return (
        <div className={clsx('w-full grid gap-4', className)}>
            {items.map((it) => (
                <TableCard key={it.id} item={it}/>
            ))}
        </div>
    );
};

export const TablesGrid = async ({lang}: { lang: Locale }) => {
    const tablesPageData = await getTablesPageData(lang)
    const regularTables = await getTablesRegular(lang)
    const zoneTables = await getTablesZones(lang)
    return (
        <div className="w-full grid grid-cols-1 gap-4">
            <div className='flex gap-1 px-1 sm:px-4'>
                <div className='text-red-400 text-xl'>*</div>
                <div className='text-white/55'>{tablesPageData?.noticeText}</div>
            </div>
            <Section items={zoneTables.table_items} className="grid-cols-1 sm:grid-cols-2"/>
            <Section items={regularTables.table_items} className="grid-cols-1 sm:grid-cols-3"/>
        </div>
    );
};
