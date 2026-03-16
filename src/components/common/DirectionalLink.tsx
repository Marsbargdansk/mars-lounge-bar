"use client";

import Link from "next/link";
import React, {useMemo} from "react";
import {usePathname} from "next/navigation";
import {getLangPrefix, withLang} from "@/shared/helpers/lang";

type Props = {
    title?: string;
    href: string;
};

export const DirectionalLink = ({title = 'View all →', href}: Props) => {
    const pathname = usePathname();
    const langPrefix = useMemo(() => getLangPrefix(pathname ?? '/'), [pathname]);

    return (
        <Link href={withLang(href, langPrefix)}
              className="rounded-xl px-0 sm:px-3 py-2 text-[12px] tracking-[0.16em]
              uppercase text-[#CFA57A]/75 hover:text-[#CFA57A] hover:bg-white/5 transition">
            {title}
        </Link>
    );
};
