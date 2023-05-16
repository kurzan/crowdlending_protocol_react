import { useData } from '../../hooks/useData';
import styles from './Stats.module.css';
import CoinIcon from '../CoinIcon/CoinIcon';
import Skeleton from 'react-loading-skeleton';

const Stats = () => {

  const {borrows, borrowsIds} = useData();
  
  const totalBorrowed = borrows?.reduce((acc, item) => acc + Number(item.totalBorrowed), 0);
  const avgRate = borrows && borrows?.reduce((acc, item) => acc + Number(item.interestRate), 0) / borrows?.length;
  
  const investorsSet = new Set();
  borrows?.forEach(borrow => {
    borrow.investors.forEach(investor => {
      if (investor.investor !== '0x0000000000000000000000000000000000000000') {
        investorsSet.add(investor.investor);
      }
    });
  });

  const totalInvestors = Array.from(investorsSet);


  return(
    <div className={styles.container}>
      <div className={styles.item}>
        <p className={styles.text}>Total borrowed</p>
        {!borrows ? <Skeleton count={1} borderRadius={"0.5rem"} /> : <p className={styles.amount}>{totalBorrowed && totalBorrowed / 10 ** 18} <CoinIcon /></p>}
      </div>

      <div className={styles.item}>
        <p className={styles.text}>Borrows</p>
        {!borrows ? <Skeleton count={1} borderRadius={"0.5rem"} /> : <p className={styles.amount}>{borrowsIds && borrowsIds.length}</p>}
      </div>
      
      <div className={styles.item}>
        <p className={styles.text}>Investors</p>
        {!borrows ? <Skeleton count={1} borderRadius={"0.5rem"} /> : <p className={styles.amount}>{totalInvestors?.length}</p>}
      </div>

      <div className={styles.item}>
        <p className={styles.text}>Avg rate</p>
        {!borrows ? <Skeleton count={1} borderRadius={"0.5rem"} /> : <p className={styles.amount + " " + styles.rate}>~{avgRate?.toFixed(2)}</p>}
      </div>

    </div>
    )
};

export default Stats;



