import type {Metadata} from "next";
import {GoogleMapEmbed} from "@/components/contact/GoogleMapEmbed";
import {PageProps} from "@/types/page";
import {Contacts} from "@/components/contact/Contacts";
import {MainPageWrapper} from "@/components/common/MainPageWrapper";
import {getContactsInfo} from "@/lib/contacts";

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {lang} = await params;
    const isPl = lang === "pl";

    return {
        title: isPl ? "Kontakt" : "Contact",
        description: isPl
            ? "Kontakt do Mars Lounge Bar w Gdańsku — adres, godziny otwarcia, mapa i informacje o lokalu."
            : "Contact Mars Lounge Bar in Gdańsk — address, opening hours, map and venue information.",
        alternates: {
            canonical: `/${lang}/contact`,
            languages: {
                pl: "/pl/contact",
                en: "/en/contact",
            },
        },
        openGraph: {
            title: isPl ? "Kontakt | Mars Lounge Bar" : "Contact | Mars Lounge Bar",
            description: isPl
                ? "Znajdź Mars Lounge Bar w Gdańsku — adres, godziny otwarcia i mapa dojazdu."
                : "Find Mars Lounge Bar in Gdańsk — address, opening hours and map location.",
            url: `https://www.mars-lounge.bar/${lang}/contact`,
        },
    };
}

export default function ContactPage({params}: PageProps) {
    const contactsInfo = getContactsInfo()
    return (
        <MainPageWrapper>
            <Contacts/>
            <GoogleMapEmbed query={contactsInfo.mapQuery}/>
        </MainPageWrapper>
    );
}