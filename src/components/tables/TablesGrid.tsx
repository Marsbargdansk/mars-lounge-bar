'use client'
import React from "react";
import {TableCard} from "./TableCard";
import {getTables} from "@/lib/tables";
import {TableCardData} from "@/types/table";
import clsx from "clsx";
import {useDict} from "@/components/i18n/I18nProvider";
import {tByKey} from "@/shared/helpers/tByKey";

const Section = ({items, className}: { items: TableCardData[]; className: string }) => {
    if (!items.length) return null;

    return (
        <div className={clsx('w-full grid gap-4', className)}>
            {items.map((it) => (
                <TableCard key={it.id} item={it}/>
            ))}
        </div>
    );
};

export const TablesGrid = () => {
    const tables = getTables();
    const dict = useDict();
    return (
        <div className="w-full grid grid-cols-1 gap-4">
            <div className='flex gap-1 px-1 sm:px-4'>
                <div className='text-red-400 text-xl'>*</div>
                <div className='text-white/55'>{tByKey(dict, 'tables.tipNotice')}</div>
            </div>
            <Section items={tables.slice(0, 2)}  className="grid-cols-1 sm:grid-cols-2"/>
            <Section items={tables.slice(2)} className="grid-cols-1 sm:grid-cols-3"/>
        </div>
    );
};
