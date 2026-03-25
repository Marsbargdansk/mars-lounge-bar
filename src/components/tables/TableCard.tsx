import React from "react";
import Image from "next/image";
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPerson} from "@fortawesome/free-solid-svg-icons";
import {TableItem} from "@/types/strapi";

type Props = {
    item: TableItem
}

export const TableCard = ({item}: Props) => {
    return (
        <div
            className={clsx("overflow-hidden rounded-[22px] border border-white/10 bg-black/30",
                "shadow-[0_18px_60px_rgba(0,0,0,0.6)] hover:border-white/15 transition  w-full box-border backdrop-blur-xs")}
        >
            {/* image */}
            <div className={clsx('relative aspect-[16/9]')}>
                {item.image?.url && (
                    <Image
                        src={item.image?.url}
                        alt={''}
                        // alt={tByKey(dict, item.nameKey)}
                        fill
                        sizes="(min-width: 640px) 50%, 100vw"
                        className="object-cover opacity-90 transition duration-500"
                    />
                )}

                <div className="pointer-events-none absolute inset-2 rounded-[18px] border border-white/5"/>
            </div>

            {/* content */}
            <div className='p-4'>
                <div className="flex items-center justify-between gap-2">
                    <div className="text-[18px] text-white/85">{item.title}</div>
                    <p
                        className="text-[15px] text-white/60"><FontAwesomeIcon icon={faPerson}/>x{item.capacity} </p>
                </div>

                {item.priceWeekdays &&
                    <div
                        className="mt-3 text-[13px] leading-5 text-white/45 flex flex-col gap-2">{item.priceWeekdays}</div>
                }
                {item.priceWeekend &&
                    <div
                        className="mt-3 text-[13px] leading-5 text-white/45 flex flex-col gap-2">{item.priceWeekend}</div>
                }
                {item.extraInfo &&
                    <div
                        className="mt-3 text-[13px] leading-5 text-white/45 flex flex-col gap-2">{item.extraInfo}</div>
                }
            </div>
        </div>
    );
};
