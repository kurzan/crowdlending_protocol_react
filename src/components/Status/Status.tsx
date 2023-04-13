import { useEffect, useState } from "react";
import styles from './Status.module.css';

const Status = ({status} : {status: string | undefined}) => {

  const getStyle = (status: string | number | undefined) => {


    switch (status) {
      case 0:
        return {
          style: styles.open,
          text: "Открыт" 
        }

      case 1:
        return {
          style: styles.active,
          text: "Активный" 
        }

      case 2:
        return {
          style: styles.closed,
          text: "Закрыт" 
        }
      case 3:
        return {
            style: styles.canceled,
            text: "Не состоялся" 
          }  
    }
  };

  return(
    <div className={getStyle(status)?.style}>
      <p className={styles.text}>{getStyle(status)?.text}</p>
    </div>
  )
};

export default Status;