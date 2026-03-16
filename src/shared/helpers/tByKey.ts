type Interpolations = Record<string, string | number>;

export const tByKey = (
    dict: any,
    key: string | null | undefined,
    vars?: Interpolations
): string => {
    if (!key) return '';

    const value = key
        .split('.')
        .reduce((acc, part) => (acc ? acc[part] : undefined), dict);

    if (typeof value !== 'string') return '';

    if (!vars) return value;

    return value.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, varName) => {
        const replacement = vars[varName];
        return replacement !== undefined ? String(replacement) : '';
    });
};
