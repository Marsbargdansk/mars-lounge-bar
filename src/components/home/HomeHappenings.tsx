'use client'
import {DirectionalLink} from "@/components/common/DirectionalLink";
import {useDict} from "@/components/i18n/I18nProvider";
import {tByKey} from "@/shared/helpers/tByKey";
import React from "react";
import {HappeningsCenter} from "@/components/happenings/Happenings";
import {getNearestOrLast} from "@/shared/helpers/getNearestOrLast";
import {sortByNearestDay} from "@/shared/helpers/sortByNearestDay";
import {SpecialOffer, StrapiEvent} from "@/types/strapi";
import {Locale} from "@/types/lang";

export const HOME_HAPPENINGS_DATA = {
    viewAll: {labelKey: "happenings.seeAll", href: "/happenings"},
};
type HomeHappeningsProps = {
    lang: Locale,
    events: StrapiEvent[],
    specials: SpecialOffer[],
};
export const HomeHappenings = ({lang, events, specials}: HomeHappeningsProps) => {
    const {viewAll} = HOME_HAPPENINGS_DATA;
    const dict = useDict();
    const nearestSpecial = [sortByNearestDay(specials)]
    const nearestEvent = getNearestOrLast(events)

    return (
        <section className="py-7 sm:py-14">
            <HappeningsCenter lang={lang} events={nearestEvent} specials={nearestSpecial}/>

            <div className="mt-2 sm:mt-4 flex justify-center">
                <DirectionalLink href={viewAll.href} title={tByKey(dict, viewAll.labelKey) + ' →'}/>
            </div>
        </section>
    );
};
