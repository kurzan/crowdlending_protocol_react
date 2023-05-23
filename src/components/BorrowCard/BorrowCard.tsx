import CompanyLogo from "../CompanyLogo/CompanyLogo";
import styles from './BorrowCard.module.css';
import { TBorrow } from "../../services/types";
import TotalBar from "../TotalBar/TotalBar";
import { ethers } from "ethers";
import Status from "../Status/Status";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getDate, getShortAddress } from "../../services/utils";
import { useData } from "../../hooks/useData";
import { useBorrowDates } from "../../hooks/useBorrowDates";

const BorrowCard = ({ borrow }: { borrow: TBorrow }) => {
  const [verifiedBorrower, setVerifiedBorrower] = useState(true);
  const navigate = useNavigate();
  const { borrowers } = useData();

  useEffect(() => {

    if (borrowers && borrowers.find(item => item.borrower === borrow.borrower)) {
      setVerifiedBorrower(true)
    } else {
      setVerifiedBorrower(false)
    }
  }, [borrowers, borrow.borrower])

    const {
      startDate,
      closetDate,
      days,
      hours,
      mins,
      secs,
      timeRemaining,
      expired,
      investors,
    } = useBorrowDates(borrow);


  return (
    <div style={!verifiedBorrower ? { backgroundColor: '#FFF3E0' } : {}} className={borrow.status <= 1 ? styles.card : styles.card + ' ' + styles.card_unactive} onClick={() => navigate(`/borrows/${Number(borrow.borrowId)}`)}>
      <div className={styles.head}>
        <CompanyLogo src={borrow.image} alt={borrow.companyName} />
        <div className={styles.statusBox}>

          <p className={styles.borId}>№ {Number(borrow.borrowId)}</p>
          <Status status={borrow.status} />
        </div>

      </div>

      <div className={styles.company}>

        {verifiedBorrower ? <p className={styles.name}>{borrow.companyName}</p> : <p className={styles.name}>{getShortAddress(borrow.borrower)}</p>}
        {verifiedBorrower ? <p className={styles.desc}>{borrow.description}</p> : <p className={styles.desc}>Unverified</p>}
      </div>

      <TotalBar from={Number(ethers.utils.formatEther(borrow.totalBorrowed))} to={Number(ethers.utils.formatEther(borrow.borrowingGoal))} />

      <div className={styles.details}>

        <div className={styles.details_item}>
          <p className={styles.details_text}>Rate</p>
          <p className={styles.details_amount + " " + styles.rate}>{Number(borrow.interestRate)}%</p>
        </div>

        <div className={styles.details_item}>
          <p className={styles.details_text}>Period</p>
          <p className={styles.details_amount}>{Number(borrow.borrowingPeriod) / 86400}d</p>
        </div>

        {borrow.status === 0 &&
          <div className={styles.details_item}>
            <p className={styles.details_text}>Created on</p>
            <p className={styles.details_amount}>{startDate}</p>
          </div>}

        {borrow.status === 1 &&
          <div className={styles.details_item}>
            <p className={styles.details_text}>Ends in</p>
            <p className={styles.details_amount}>{!expired ? `${days}d ${hours}h` : "⚠️ Expected"}</p>
          </div>}

        {borrow.status === 2 &&
          <div className={styles.details_item}>
            <p className={styles.details_text}>Closed</p>
            <p className={styles.details_amount}>{closetDate}</p>
          </div>}

        {borrow.status === 3 &&
          <div className={styles.details_item}>
            <p className={styles.details_text}>Closed</p>
            <p className={styles.details_amount}>{closetDate}</p>
          </div>}

      </div>
    </div>
  )
};

export default BorrowCard;

