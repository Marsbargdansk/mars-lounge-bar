import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {hasLocale} from "./dictionaries";
import {HomeIntro} from "@/components/home/HomeIntro";
import {HomeAtmosphere} from "@/components/home/HomeAtmosphere";
import {HomeMenuPreview} from "@/components/home/HomeMenuPreview";
import {Contacts} from "@/components/contact/Contacts";
import {PageProps} from "@/types/page";
import {HomeHappenings} from "@/components/home/HomeHappenings";
import {MainPageWrapper} from "@/components/common/MainPageWrapper";
import {getEvents} from "@/lib/strapi/events";
import {getHomeData} from "@/lib/strapi/homePage";
import {getContactData} from "@/lib/strapi/contactPage";
import {getSpecialOffers} from "@/lib/strapi/specialOffers";

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {lang} = await params;

    const isPl = lang === "pl";

    return {
        title: isPl ? "Strona główna" : "Home",
        description: isPl
            ? "Mars Lounge Bar w Gdańsku — koktajle autorskie, shisha, wydarzenia i wyjątkowa atmosfera."
            : "Mars Lounge Bar in Gdańsk — signature cocktails, shisha, events and a unique atmosphere.",
        alternates: {
            canonical: `/${lang}`,
            languages: {
                pl: "/pl",
                en: "/en",
            },
        },
        openGraph: {
            title: isPl ? "Mars Lounge Bar" : "Mars Lounge Bar",
            description: isPl
                ? "Mars Lounge Bar w Gdańsku — koktajle autorskie, shisha, wydarzenia i wyjątkowa atmosfera."
                : "Mars Lounge Bar in Gdańsk — signature cocktails, shisha, events and a unique atmosphere.",
            url: `https://www.mars-lounge.bar/${lang}`,
        },
    };
}

export default async function Home({params}: PageProps) {
    const {lang} = await params;
    const events = await getEvents(lang);
    const specials = await getSpecialOffers(lang);
    const homeData = await getHomeData(lang);
    const contactPageData = await getContactData(lang);
    if (!hasLocale(lang)) notFound();

    return (
        <MainPageWrapper className="max-w-7xl">
            <HomeIntro data={homeData}/>
            <HomeHappenings lang={lang} events={events} specials={specials}/>
            <HomeAtmosphere data={homeData}/>
            <HomeMenuPreview/>
            <Contacts data={contactPageData}/>
        </MainPageWrapper>
    );
}