import { FC } from "react";
import styles from './TotalBar.module.css';
import CoinIcon from "../CoinIcon/CoinIcon";

type TTotalBarProps = {
  from: number;
  to: number
};

const TotalBar: FC<TTotalBarProps> = ({from = 0, to = 0}) => {

  const percent = from / to * 100;

  return (
    <div className={styles.total_bar}>
      <div className={styles.total_head}>
        <p>{percent}%</p>
        <div className={styles.total_amount}>        
          <p>{from}<span className={styles.slash}> / </span>{to}</p>
          <CoinIcon />
        </div>
      </div>
      <progress className={styles.progress} max={to} value={from} />
    </div>
  )
};

export default TotalBar;