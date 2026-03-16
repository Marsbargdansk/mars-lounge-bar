import {type ReactNode} from "react";

export const BigCardWrapper = ({children}: { children: ReactNode }) => {
    return (
            <div className="overflow-hidden rounded-[28px] border border-white/10
            bg-black/35 backdrop-blur-md shadow-[0_18px_70px_rgba(0,0,0,0.65)]"
            >
                {children}
            </div>
    )
}