import type {Metadata} from "next";
import {TablesGrid} from "@/components/tables/TablesGrid";
import {MainPageWrapper} from "@/components/common/MainPageWrapper";
import {PageProps} from "@/types/page";

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {lang} = await params;
    const isPl = lang === "pl";

    return {
        title: isPl ? "Stoliki" : "Tables",
        description: isPl
            ? "Zobacz dostępne stoliki w Mars Lounge Bar w Gdańsku — strefa VIP i stoliki lounge."
            : "Explore available tables at Mars Lounge Bar in Gdańsk — VIP zone and lounge tables.",
        alternates: {
            canonical: `/${lang}/tables`,
            languages: {
                pl: "/pl/tables",
                en: "/en/tables",
            },
        },
        openGraph: {
            title: isPl ? "Stoliki | Mars Lounge Bar" : "Tables | Mars Lounge Bar",
            description: isPl
                ? "Zobacz dostępne stoliki w Mars Lounge Bar w Gdańsku — strefa VIP i stoliki lounge."
                : "Explore available tables at Mars Lounge Bar in Gdańsk — VIP zone and lounge tables.",
            url: `https://www.mars-lounge.bar/${lang}/tables`,
        },
    };
}

export default function TablesPage() {
    return (
        <MainPageWrapper>
            <TablesGrid/>
        </MainPageWrapper>
    );
}