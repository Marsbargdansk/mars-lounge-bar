import {type NextRequest, NextResponse} from 'next/server';
import Negotiator from 'negotiator';
import {match} from '@formatjs/intl-localematcher';
import {defaultLocale, locales} from "@/types/lang";

const PUBLIC_FILE = /\.(.*)$/;

export const getLocale = (request: NextRequest) => {
    const headers = {'accept-language': request.headers.get('accept-language') ?? ''};
    const languages = new Negotiator({headers}).languages();
    return match(languages, [...locales], defaultLocale);
};

export function proxy(request: NextRequest) {
    const {pathname} = request.nextUrl;

    // ✅ пропускаем статические файлы из public: /favicon.ico, /white-wall-3-2.png, /health.txt и т.д.
    if (PUBLIC_FILE.test(pathname)) return;

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (pathnameHasLocale) return;

    const locale = getLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    // ✅ не трогаем _next и любые пути с точкой (файлы)
    matcher: ['/((?!_next|.*\\..*).*)'],
};
