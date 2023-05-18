import { FC } from "react";
import styles from './TotalBar.module.css';
import CoinIcon from "../CoinIcon/CoinIcon";
import TooltipBox from "../TooltipBox/TooltipBox";
import { getShortAddress, getShortAmount } from "../../services/utils";

type TTotalBarProps = {
  from: number;
  to: number
};

const TotalBar: FC<TTotalBarProps> = ({from = 0, to = 0}) => {

  const percent = (from / to * 100).toFixed();

  return (
    <div className={styles.total_bar}>
      <progress className={styles.progress} max={to} value={from} />
      <div className={styles.total_head}>
        <div className={styles.total_amount}>   

          <TooltipBox tooltipText={from}><p className={styles.from}>{getShortAmount(from.toString())}</p></TooltipBox>
    
          <span className={styles.slash}> / </span><p className={styles.to}>{to}</p>
          <CoinIcon />
        </div>
        <p>{percent}%</p>
      </div>
      
    </div>
  )
};

export default TotalBar;
