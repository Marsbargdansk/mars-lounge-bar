'use client'
import React from "react";
import {tByKey} from "@/shared/helpers/tByKey";
import {useDict} from "@/components/i18n/I18nProvider";
import clsx from "clsx";


type Props = {
    titleKey: string;
    className?: string;
};
export const CardTitle = ({titleKey, className}: Props) => {
    const dict = useDict();

    return (
        <h2 className={clsx("text-center text-[24px] tracking-[0.22em] uppercase text-white/85 mb-2 sm:mb-8", className)}>
            {tByKey(dict, titleKey)}
        </h2>
    );
};

