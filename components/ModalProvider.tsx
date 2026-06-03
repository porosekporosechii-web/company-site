'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { RequestModal } from './RequestModal';

interface ModalOpts {
  service?: string;
  source?: string;
}

interface ModalContextType {
  openModal: (opts?: ModalOpts) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState<string | undefined>();
  const [source, setSource] = useState<string | undefined>();

  const openModal = useCallback((opts?: ModalOpts) => {
    setService(opts?.service);
    setSource(opts?.source);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setService(undefined);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && <RequestModal onClose={closeModal} service={service} source={source} />}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
