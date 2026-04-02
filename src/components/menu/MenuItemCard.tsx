import React from "react";
import Image from "next/image";
import {MenuItem} from "@/types/strapi";

type Props = {
    item: MenuItem;
};

export const MenuItemCard = ({item}: Props) => {
    return (
        <button
            type="button"
            className="group relative w-full sm:w-[260px] shrink-0 text-left overflow-hidden rounded-[18px] border
            border-white/10 bg-black/35 shadow-[0_8px_7px_rgba(0,0,0,0.65)] transition hover:border-white/15
             h-full flex flex-col backdrop-blur-xs"
        >
            <div className="relative min-h-[260px] aspect-square w-full">
                {item?.image?.url && (
                    <Image
                        src={item.image.url}
                        alt={item.image.name}
                        fill
                        sizes="(min-width: 640px) 260px, 100vw"
                        className="object-contain opacity-90 transition duration-500"
                    />
                )}
            </div>

            <div className="p-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <div className="line-clamp-2 text-[16px] text-white/85">
                            {item.title}
                        </div>

                        {item.volume && (
                            <div className="mt-1 text-xs text-[#CFA57A]/75">
                                {item.volume} {item.unit}
                            </div>
                        )}
                    </div>
                    {item.price && (
                        <div className="text-[15px] text-white/65">
                            {item.price} PLN
                        </div>
                    )}
                </div>

                {item.description && (
                    <div className="mt-1 line-clamp-4 text-[13px] text-white/45">
                        {item.description}
                    </div>
                )}
            </div>
        </button>
    );
};
