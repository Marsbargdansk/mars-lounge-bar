import type {Metadata} from "next";
import type {ReactNode} from "react";
import {notFound} from "next/navigation";
import Script from "next/script";
import {montserrat} from "@/app/[lang]/fonts/fonts";
import {Header} from "@/components/header/Header";
import {Footer} from "@/components/footer/Footer";
import {I18nProvider} from "@/components/i18n/I18nProvider";
import {getDictionary, hasLocale} from "@/app/[lang]/dictionaries";
import {config} from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import {Analytics} from "@vercel/analytics/next";
import type {MenuCategory} from "@/types/strapi";
import {getMenuCategories} from "@/lib/collections/menu";

config.autoAddCss = false;

export const dynamic = "force-static";
export const revalidate = false;

export const generateStaticParams = async () => [{lang: "pl"}, {lang: "en"}];

type MetadataProps = {
    params: Promise<{ lang: string }>;
};
const schema = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "The Mars Lounge Bar & Shisha",
    url: "https://www.mars-lounge.bar",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Długie Ogrody 18/U6",
        postalCode: "80-765",
        addressLocality: "Gdańsk",
        addressCountry: "PL",
    },
    telephone: "+48 508 601 414",
    email: "marsbargdansk@gmail.com",
    servesCuisine: [
        "Cocktails",
        "Mocktails",
        "Shisha",
        "Snacks",
        "Coffee",
        "Tea"
    ],
    priceRange: "$$",
    sameAs: ["https://www.instagram.com/themars_bar_/"],
};

export async function generateMetadata({params}: MetadataProps): Promise<Metadata> {
    const {lang} = await params;

    if (!hasLocale(lang)) notFound();

    const isPl = lang === "pl";

    const title = isPl
        ? "Mars Lounge Bar | Koktajle, shisha i wyjątkowa atmosfera w Gdańsku"
        : "Mars Lounge Bar | Cocktails, shisha and premium atmosphere in Gdańsk";

    const description = isPl
        ? "Mars Lounge Bar w Gdańsku — autorskie koktajle, shisha i wyjątkowa atmosfera premium."
        : "Mars Lounge Bar in Gdańsk — signature cocktails, shisha and a premium lounge atmosphere.";

    return {
        metadataBase: new URL("https://www.mars-lounge.bar"),
        title: {
            default: title,
            template: "%s | Mars Lounge Bar",
        },
        description,
        alternates: {
            canonical: `/${lang}`,
            languages: {
                pl: "/pl",
                en: "/en",
                "x-default": "/pl",
            },
        },
        openGraph: {
            type: "website",
            siteName: "Mars Lounge Bar",
            title,
            description,
            url: `https://www.mars-lounge.bar/${lang}`,
            locale: isPl ? "pl_PL" : "en_GB",
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

type LangLayoutProps = {
    children: ReactNode;
    params: Promise<{ lang: string }>;
};

export default async function RootLayout({children, params}: LangLayoutProps) {
    const {lang} = await params;

    if (!hasLocale(lang)) notFound();
    const categories: MenuCategory[] = await getMenuCategories(lang);
    const dict = await getDictionary(lang);

    return (
        <html lang={lang}>
        <head>
            <Script id="google-tag-manager" strategy="beforeInteractive">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TTW4QZBM');`}
            </Script>
        </head>
        <body className={`${montserrat.className} antialiased`}>
        <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TTW4QZBM"
                    height="0"
                    width="0"
                    style={{display: "none", visibility: "hidden"}}
                    title="Google Tag Manager"
            />
        </noscript>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
        />
        <I18nProvider dict={dict}>
            <Analytics/>
            <Header categories={categories} lang={lang}/>
            {children}
            <Footer/>
        </I18nProvider>
        </body>
        </html>
    );
}
