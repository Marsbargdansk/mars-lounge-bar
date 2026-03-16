'use client'
import React from "react";
import Image from "next/image";
import {useDict} from "@/components/i18n/I18nProvider";
import {TableCardData} from "@/types/table";
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPerson} from "@fortawesome/free-solid-svg-icons";
import {tByKey} from "@/shared/helpers/tByKey";

type Props = {
    item: TableCardData
}

export const TableCard = ({item}: Props) => {
    const dict = useDict();
    const imageUrl = '/images/tables/' + item.id + '.jpg'
    return (
        <div
            className={clsx("overflow-hidden rounded-[22px] border border-white/10 bg-black/30",
                "shadow-[0_18px_60px_rgba(0,0,0,0.6)] hover:border-white/15 transition  w-full box-border backdrop-blur-xs")}
        >
            {/* image */}
            <div className={clsx('relative aspect-[16/9]')}>
                <Image
                    src={imageUrl}
                    alt={''}
                    // alt={tByKey(dict, item.nameKey)}
                    fill
                    sizes="(min-width: 640px) 50%, 100vw"
                    className="object-cover opacity-90 transition duration-500"
                />
                <div className="pointer-events-none absolute inset-2 rounded-[18px] border border-white/5"/>
            </div>

            {/* content */}
            <div className='p-4'>
                <div className="flex items-center justify-between gap-2">
                    <div className="text-[18px] text-white/85">{tByKey(dict, `tables.${item.id}.title`)}</div>
                    <p
                        className="text-[15px] text-white/60"><FontAwesomeIcon icon={faPerson}/>x{item.personLimit} </p>
                </div>

                {item.smallDeposit &&
                    <div
                        className="mt-3 text-[13px] leading-5 text-white/45 flex flex-col gap-2">{tByKey(dict, 'tables.smallDeposit', {amount: item.smallDeposit})}</div>
                }
                {item.bigDeposit &&
                    <div
                        className="mt-3 text-[13px] leading-5 text-white/45 flex flex-col gap-2">{tByKey(dict, 'tables.bigDeposit', {amount: item.bigDeposit})}</div>
                }
                {item.hoursLimit &&
                    <div
                        className="mt-3 text-[13px] leading-5 text-white/45 flex flex-col gap-2">{item.hoursLimit}&nbsp;{tByKey(dict, `tables.hoursLimit`)}</div>
                }
            </div>
        </div>
    );
};
