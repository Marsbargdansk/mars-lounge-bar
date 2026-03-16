import React from 'react';
import {motion} from 'framer-motion';

type Props = {
    onClose: () => void;
};

export const MobileNavOverlay = ({onClose}: Props) => {
    return (
        <motion.button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={onClose}
            aria-label="Закрыть меню"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        />
    );
};
