import React from 'react';
import clsx from "clsx";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export const HeaderShell = ({children, className}: Props) => {
    return (
        <div
            className={clsx("flex h-14 items-center justify-between rounded-2xl border border-white/10",
                "bg-black/35 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.55)]", className)}
        >
            {children}
        </div>
    );
};
