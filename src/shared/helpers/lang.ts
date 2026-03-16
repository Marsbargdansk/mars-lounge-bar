import {Locale} from "@/types/lang";

export const getLangPrefix = (path: string) => {
    const m = path.match(/^\/([^/]+)(\/|$)/);
    const maybeLang = m?.[1];
    return maybeLang ? `/${maybeLang}` : '';
};


export const withLang = (href: string, langPrefix: string) => {
    if (!langPrefix) return href ? `/${href}` : '/';
    return href ? `${langPrefix}/${href}` : `${langPrefix}/`;
};

export const getCurrentLocale = (pathname: string): Locale =>
    pathname.startsWith('/en') ? 'en' : 'pl';

export const buildLocalePath = (pathname: string, locale: Locale) =>
    pathname.replace(/^\/(pl|en)/, `/${locale}`);