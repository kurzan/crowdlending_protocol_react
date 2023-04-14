import styles from "./Modal.module.css";
import React, {useCallback, FC, useEffect} from "react";
import ReactDOM from "react-dom";
import { MdClose } from 'react-icons/md';

type TModalProps = {
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
};

const Modal:FC<TModalProps> = ({children, title, onClose}) => {

  const close = useCallback(() => {
    onClose && onClose();
  }, [onClose])

  const onEscClose = useCallback((evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      close();
    }
  }, [close]);

  useEffect(() => {
    document.addEventListener("keydown", onEscClose);
    
    return () => {
      document.removeEventListener("keydown", onEscClose);
    };
  }, [onEscClose]);


  return ReactDOM.createPortal(
    <>
      <div onClick={close} className={styles.overlay}></div>
      <div className={styles.modal}>
        <div className={styles.head}>
          <p className={styles.title}>{title}</p>
          <div onClick={onClose} className={styles.close}>
            <MdClose size={25} />
          </div>
        </div>
        {children}
      </div>
    </>,
    document.querySelector('#modals') as HTMLElement
  )
};

export default Modal;