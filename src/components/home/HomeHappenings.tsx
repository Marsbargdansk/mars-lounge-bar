'use client'
import {DirectionalLink} from "@/components/common/DirectionalLink";
import {useDict} from "@/components/i18n/I18nProvider";
import {tByKey} from "@/shared/helpers/tByKey";
import React from "react";
import {HappeningsCenter} from "@/components/happenings/Happenings";
import {getSpecials} from "@/lib/happenings";
import {getNearestOrLast} from "@/shared/helpers/getNearestOrLast";
import {getNearestDay} from "@/shared/helpers/getNearestDay";
import {StrapiEvent} from "@/lib/strapi/types";

export const HOME_HAPPENINGS_DATA = {
    viewAll: {labelKey: "happenings.seeAll", href: "/happenings"},
};
type HomeHappeningsProps = { events: StrapiEvent[] };
export const HomeHappenings = ({events}: HomeHappeningsProps) => {
    const {viewAll} = HOME_HAPPENINGS_DATA;
    const dict = useDict();
    const specials = [getNearestDay(getSpecials())]
    const nearestEvent = getNearestOrLast(events)

    return (
        <section className="py-7 sm:py-14">
            <HappeningsCenter events={nearestEvent} specials={specials}/>

            <div className="mt-2 sm:mt-4 flex justify-center">
                <DirectionalLink href={viewAll.href} title={tByKey(dict, viewAll.labelKey) + ' →'}/>
            </div>
        </section>
    );
};
