// /components/modal/BaseModal.tsx

import { memo, MouseEventHandler, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './BaseModal.module.css';

export interface IBaseModalProps {
  show: boolean;
//   title: string;
  children: string | ReactNode;
//   footer?: string | ReactNode;
  closeOnTap?: boolean;
  onClose?: () => void;
}

export const BaseModal = memo((props: IBaseModalProps) => {
 
  const {closeOnTap, onClose, children , show} = props;

  const root = document.getElementById('root');

  if (!root) throw new Error('Root node not found. Can`t render modal.');

  const handleInsideClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!closeOnTap) {
      event.stopPropagation();
    }
  };

  const handleOutsideClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (onClose) {
      onClose();
    }
  };
  
  return createPortal(  
    <div onClick={handleOutsideClick} className={styles.container}>
        <div className={styles.inner_container} onClick={handleInsideClick}>
          {children}
        </div>
    </div>
    ,
    root
  );
});
