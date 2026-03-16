"use client";


import React from "react";
import {MenuItemCard} from "./MenuItemCard";
import {DirectionalLink} from "@/components/common/DirectionalLink";
import {MenuItem} from "@/types/menu";

type Props = {
    title: string;
    categoryId: string;
    items: MenuItem[];
};

export const CategoryRow = ({title, items, categoryId}: Props) => {
    return (
        <div className="flex flex-col items-start justify-center gap-2 pb-6 rounded-xl sm:px-4">
            <div className="w-full flex flex-wrap items-start justify-between gap-4 px-4 sm:px-0">
                <h3 className="text-[22px] tracking-[0.06em] text-white/80">{title}</h3>
                <DirectionalLink href={'menu' + '/' + categoryId}/>
            </div>

            <div
                className="w-full flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory px-4 sm:px-0 scroll-px-4
                     [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.map((it) => (
                    <div key={it.id} className="snap-start">
                        <MenuItemCard item={it}/>
                    </div>
                ))}
            </div>
        </div>
    );
};
