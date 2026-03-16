'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export const Modal = ({ open, onClose, children }: ModalProps) => {
    useEffect(() => {
        if (!open) return;

        const onEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', onEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onEsc);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
            />
            <div className="relative z-10 w-full max-w-lg rounded-xl bg-neutral-900 p-6">
                {children}
            </div>
        </div>,
        document.body
    );
};
