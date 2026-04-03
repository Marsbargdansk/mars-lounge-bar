import type {Metadata} from "next";
import {PageProps} from "@/types/page";
import React from "react";
import {HappeningsCenter} from "@/components/happenings/Happenings";
import {MainPageWrapper} from "@/components/common/MainPageWrapper";
import {getEvents} from "@/lib/collections/events";
import {getSpecialOffers} from "@/lib/collections/specialOffers";

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {lang} = await params;
    const isPl = lang === "pl";

    return {
        title: isPl ? "Wydarzenia" : "Events",
        description: isPl
            ? "Wydarzenia i specjalne oferty w Mars Lounge Bar w Gdańsku — imprezy, wydarzenia i promocje."
            : "Events and special offers at Mars Lounge Bar in Gdańsk — parties, happenings and promotions.",
        alternates: {
            canonical: `/${lang}/happenings`,
            languages: {
                pl: "/pl/happenings",
                en: "/en/happenings",
            },
        },
        openGraph: {
            title: isPl ? "Wydarzenia | Mars Lounge Bar" : "Events | Mars Lounge Bar",
            description: isPl
                ? "Zobacz wydarzenia i promocje w Mars Lounge Bar w Gdańsku."
                : "Discover events and promotions at Mars Lounge Bar in Gdańsk.",
            url: `https://www.mars-lounge.bar/${lang}/happenings`,
        },
    };
}

export default async function HappeningsPage({params}: PageProps) {
    const {lang} = await params;
    const events = await getEvents(lang);
    const specials = await getSpecialOffers(lang);

    return (
        <MainPageWrapper>
            <HappeningsCenter lang={lang} events={events} specials={specials}/>
        </MainPageWrapper>
    );
}