import {Locale} from "@/types/lang";

export type PageProps = {
    params: Promise<{ lang: Locale }>;
};