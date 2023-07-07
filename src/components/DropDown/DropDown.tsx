import React, { useRef, useState, useEffect, ReactNode, FC } from 'react';
import styles from "./DropDowm.module.css";

type TDropDown = {
  children: ReactNode,
  title?: string,
  img: string
}

const DropDown: FC<TDropDown> = ({children, title, img}) => {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);

  const handleShareClick = () => {
    setShowMenu(!showMenu);
  };

  const handleOutsideClick = (e: any) => {
    //@ts-ignore
    if (ref.current && !ref.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  });

  return (
    <div className={styles.drop} ref={ref} onClick={handleShareClick}>
      <img src={img} alt="" />
      <p>{title}</p>
      {showMenu && (
        <div className={styles.menu}>
          {children}
        </div>
      )}
    </div>
  );
};

export default DropDown;