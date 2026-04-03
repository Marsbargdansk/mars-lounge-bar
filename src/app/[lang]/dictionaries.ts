import 'server-only';
import {promises as fs} from 'fs';
import path from 'path';
import {Locale, locales} from "@/types/lang";

export const hasLocale = (locale: string): locale is Locale =>
    (locales as readonly string[]).includes(locale);

const LOCALES_DIR = path.join(process.cwd(), 'src/locales');

export const getDictionary = async (locale: Locale) => {
    const localeDir = path.join(LOCALES_DIR, locale);
    const files = await fs.readdir(localeDir);

    const entries = await Promise.all(
        files
            .filter((f) => f.endsWith('.json'))
            .map(async (file) => {
                const key = file.replace('.json', '');
                const content = await fs.readFile(
                    path.join(localeDir, file),
                    'utf-8'
                );
                return [key, JSON.parse(content)];
            })
    );

    return Object.fromEntries(entries);
};
