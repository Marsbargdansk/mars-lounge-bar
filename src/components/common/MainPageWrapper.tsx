import {ReactNode} from "react";
import clsx from "clsx";

type MainPageWrapperProps = {
    children: ReactNode;
    className?: string;
};
export const MainPageWrapper = ({children, className}: MainPageWrapperProps) => {
    return (
        <main className={clsx('sm:max-w-5xl mx-auto pt-24 px-4 min-h-[calc(100vh-120px)]', className)}>
            {children}
        </main>
    );
}
