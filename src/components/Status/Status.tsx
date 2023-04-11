import { useEffect, useState } from "react";
import styles from './Status.module.css';

const Status = ({status} : {status: string}) => {

  const [style, setStyle] = useState<any>();

  const getStyle = (status: string) => {

    switch (status) {
      case "Открыт":
        return styles.open

      case "Активен":
        return styles.active

      case "Закрыт":
        return styles.closed
    }
  };

  useEffect(() => {
    setStyle(getStyle(status));
  }, [status])


  return(
    <div className={style}>
      <p>{status}</p>
    </div>
  )
};

export default Status;