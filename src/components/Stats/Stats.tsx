import { useData } from '../../hooks/useData';
import styles from './Stats.module.css';
import CoinIcon from '../CoinIcon/CoinIcon';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from 'react-i18next';

const Stats = () => {

  const { t } = useTranslation();

  const {borrows, borrowsIds} = useData();
  
  const totalBorrowed = borrows?.reduce((acc, item) => acc + Number(item.totalBorrowed), 0);
  const avgRate = borrows && borrows.filter(borrow => borrow.status !== 3)?.reduce((acc, item) => acc + Number(item.interestRate), 0) / borrows?.length;
  
  const investorsSet = new Set();
  borrows?.forEach(borrow => {
    borrow.investors.forEach(investor => {
      if (investor.investor !== '0x0000000000000000000000000000000000000000') {
        investorsSet.add(investor.investor);
      }
    });
  });

  const totalInvestors = Array.from(investorsSet);


  const borrowersSet = new Set();
  borrows?.forEach(borrow => {
    borrowersSet.add(borrow.borrower)
  });

  const totalBorrowers = Array.from(borrowersSet);

  return(
    <div className={styles.container}>
      <div className={styles.item}>
        <p className={styles.text}>{t('Total borrowed')}</p>
        {!borrows ? <Skeleton count={1} borderRadius={"0.5rem"} /> : (
          <div style={{display: "flex", alignItems: "center", gap: "6px"}}>
            <p className={styles.amount}>{totalBorrowed && (totalBorrowed / 10 ** 18).toFixed(2)}</p>
            <CoinIcon />
          </div>
        )}
      </div>

      <div className={styles.item}>
        <p className={styles.text}>{t('Borrowers')}</p>
        {!borrows ? <Skeleton count={1} borderRadius={"0.5rem"} /> : <p className={styles.amount}>{totalBorrowers && totalBorrowers.length}</p>}
      </div>
      
      <div className={styles.item}>
        <p className={styles.text}>{t('Investors')}</p>
        {!borrows ? <Skeleton count={1} borderRadius={"0.5rem"} /> : <p className={styles.amount}>{totalInvestors?.length}</p>}
      </div>

      <div className={styles.item}>
        <p className={styles.text}>{t('Avg rate')}</p>
        {!borrows ? <Skeleton count={1} borderRadius={"0.5rem"} /> : <p className={styles.amount + " " + styles.rate}>~{avgRate?.toFixed(2)}</p>}
      </div>

    </div>
    )
};


export default Stats;



