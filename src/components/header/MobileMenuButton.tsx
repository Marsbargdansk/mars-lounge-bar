import React from 'react';

type Props = {
    isOpen: boolean;
    onToggle: () => void;
};

export const MobileMenuButton = ({isOpen, onToggle}: Props) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="
        grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5
        text-white/80 hover:text-white hover:bg-white/10 transition
        md:hidden
      "
            aria-label={isOpen ? 'open menu' : 'close menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
        >
            <span className="block h-[2px] w-5 bg-current opacity-90" />
            <span className="mt-1 block h-[2px] w-5 bg-current opacity-65" />
        </button>
    );
};
