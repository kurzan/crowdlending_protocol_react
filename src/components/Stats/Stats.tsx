import { useData } from '../../hooks/useData';
import styles from './Stats.module.css';
import CoinIcon from '../CoinIcon/CoinIcon';

const Stats = () => {

  const {borrows, borrowsIds} = useData();
  
  const totalBorrowed = borrows?.reduce((acc, item) => acc + Number(item.totalBorrowed), 0);
  const avgRate = borrows && borrows?.reduce((acc, item) => acc + Number(item.interestRate), 0) / borrows?.length;



  return(
    <div className={styles.container}>
      <div className={styles.item}>
        <p className={styles.text}>Total borrowed</p>
        <p className={styles.amount}>{totalBorrowed && totalBorrowed / 10 ** 18} <CoinIcon /></p>
      </div>

      <div className={styles.item}>
        <p className={styles.text}>Borrows</p>
        <p className={styles.amount}>{borrowsIds && borrowsIds.length}</p>
      </div>
      
      <div className={styles.item}>
        <p className={styles.text}>Avg rate</p>
        <p className={styles.amount + " " + styles.rate}>~{avgRate?.toFixed(2)}</p>
      </div>

    </div>
  )
};

export default Stats;