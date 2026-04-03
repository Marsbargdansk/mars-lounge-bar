import React, {ReactNode} from "react";

export const HappeningsCard = ({children}: { children: ReactNode }) => {
    return (
        <div className="group relative overflow-hidden w-full  shadow-[0_18px_70px_rgba(0,0,0,0.65)] rounded-[22px]">
            <div
                className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/25 transition hover:border-white/15 ">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.08),rgba(0,0,0,0.92))]"/>
                    <div
                        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.10),rgba(0,0,0,0.65))]"/>
                </div>
                {children}
            </div>
        </div>
    );
};

