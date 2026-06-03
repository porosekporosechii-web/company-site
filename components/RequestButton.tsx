'use client';

import { useModal } from './ModalProvider';

interface Props {
  className?: string;
  service?: string;
  source?: string;
  children?: React.ReactNode;
}

export function RequestButton({ className, service, source, children }: Props) {
  const { openModal } = useModal();
  return (
    <button
      type="button"
      onClick={() => openModal({ service, source })}
      className={className}
    >
      {children ?? 'Оставить заявку'}
    </button>
  );
}
