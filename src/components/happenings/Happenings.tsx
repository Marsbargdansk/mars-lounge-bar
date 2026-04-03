'use client'
import {tByKey} from "@/shared/helpers/tByKey";
import React from "react";
import {isToday} from "@/shared/helpers/isToday";
import {HappeningsCard} from "@/components/happenings/HappeningsCard";
import {HappeningsCardContent} from "@/components/happenings/HappeningsCardContent";
import {useDict} from "@/components/i18n/I18nProvider";
import {SpecialOffer, StrapiEvent} from "@/types/strapi";
import {buildTimeRange, formatShortDate} from "@/shared/helpers/date";
import {CardTitle} from "@/components/common/CardTitle";
import {Locale} from "@/types/lang";


type Props = {
    lang: Locale;
    events: StrapiEvent[] | null;
    specials: SpecialOffer[];
};

export const HappeningsCenter = ({lang, events, specials}: Props) => {
    const dict = useDict();

    return (
        <div className="flex flex-col sm:flex-row justify-center w-full gap-6">
            <div className='w-full'>
                <CardTitle titleKey='happenings.titleEvents'/>
                <HappeningsCard>
                    {events?.map((event) => {
                        const meta = buildTimeRange(event.timeStart, event.timeEnd)
                        return (
                            <HappeningsCardContent
                                key={event.id}
                                title={event.title}
                                date={formatShortDate(event.date)}
                                meta={meta}
                                description={event.description}
                            />
                        )
                    })}
                </HappeningsCard>
            </div>
            <div className='w-full'>
                <CardTitle titleKey='happenings.titleSpecials'/>
                <HappeningsCard>
                    {specials.map((special) => (
                        <HappeningsCardContent
                            key={special.slug}
                            title={special.title}
                            date={special.day}
                            meta={isToday(special.slug) ?
                                tByKey(dict, 'happenings.today')
                                : null}
                            description={special.description}
                        />
                    ))}
                </HappeningsCard>
            </div>
        </div>
    );
};

