import { useEffect, useState } from "react";
import styles from './Status.module.css';
import { style } from "@vanilla-extract/css";

const Status = ({status} : {status: string | undefined}) => {

  const getStyle = (status: string | number | undefined) => {


    switch (status) {
      case 0:
        return {
          style: styles.open,
          text: "Open" 
        }

      case 1:
        return {
          style: styles.active,
          text: "Active" 
        }

      case 2:
        return {
          style: styles.closed,
          text: "Closed" 
        }
      case 3:
        return {
            style: styles.canceled,
            text: "Canceled" 
          }  
    }
  };

  return(
      <p className={styles.p + " " + getStyle(status)?.style}>{getStyle(status)?.text}</p>
  )
};

export default Status;