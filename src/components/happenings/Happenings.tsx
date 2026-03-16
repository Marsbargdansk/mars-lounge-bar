'use client'
import {tByKey} from "@/shared/helpers/tByKey";
import React from "react";
import {isToday} from "@/shared/helpers/isToday";
import {HappeningsCard} from "@/components/happenings/HappeningsCard";
import {HappeningsCardContent} from "@/components/happenings/HappeningsCardContent";
import {SpecialsData} from "@/lib/happenings";
import {useDict} from "@/components/i18n/I18nProvider";
import {StrapiEvent} from "@/lib/strapi/types";
import {buildTimeRange, formatShortDate} from "@/shared/helpers/date";
import {CardTitle} from "@/components/common/CardTitle";


type Props = {
    events: StrapiEvent[] | null;
    specials: SpecialsData[];
};

export const HappeningsCenter = ({events, specials}: Props) => {
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
                            key={special.id}
                            title={tByKey(dict, `happenings.specials.${special.id}.title`)}
                            dayKey={`happenings.specials.days.${special.day}`}
                            isToday={isToday(special.id)}
                            description={tByKey(dict, `happenings.specials.${special.id}.description`)}
                        />
                    ))}
                </HappeningsCard>
            </div>
        </div>
    );
};

