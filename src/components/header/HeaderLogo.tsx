import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
    href: string;
};

export const HeaderLogo = ({ href }: Props) => {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-5 text-white/90 hover:text-white transition"
            aria-label="На главную"
        >
            <Image
                src="/images/common/mars-logo.png"
                width={120}
                height={20}
                alt="Mars Lounge Bar logo"
                priority
                sizes="120px"
                className="h-[35px] w-auto"
            />
        </Link>
    );
};
