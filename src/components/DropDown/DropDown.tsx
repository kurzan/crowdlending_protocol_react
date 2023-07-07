import React, { useRef, useState, useEffect, ReactNode, FC } from 'react';
import styles from "./DropDowm.module.css";

type TDropDown = {
  children: ReactNode,
  title?: string,
  img: string,
  width?: string,
  height?: string,
}

const DropDown: FC<TDropDown> = ({children, title, img, width = "100%", height = "100%"}) => {
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
      <img src={img} alt="" width={width} height={height} />
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