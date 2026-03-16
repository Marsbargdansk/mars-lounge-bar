'use client';

import React, {createContext, useContext} from 'react';
import type {MenuDictionary} from '@/types/i18n';

const I18nContext = createContext<MenuDictionary | null>(null);

type I18nProviderProps = {
    dict: MenuDictionary;
    children: React.ReactNode;
};
export const I18nProvider = ({dict, children}: I18nProviderProps) => {
    return <I18nContext.Provider value={dict}>{children}</I18nContext.Provider>;
};

export const useDict = () => {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error('useDict must be used within I18nProvider');
    return ctx;
};
