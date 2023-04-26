import CompanyLogo from "../CompanyLogo/CompanyLogo";
import styles from './BorrowCard.module.css';
import { TBorrow } from "../../services/types";
import TotalBar from "../TotalBar/TotalBar";
import { ethers } from "ethers";
import Status from "../Status/Status";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getDate } from "../../services/utils";

const BorrowCard= ({borrow} : {borrow: TBorrow}) => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState<string>();
  const [closetDate, setClosedDate] = useState<string>();

  const [days, setdays] = useState(0);
  const [hours, sethours] = useState(0);
  const [mins, setmins] = useState(0);
  const [secs, setsecs] = useState(0);

  const [timeRemaining, setTimeRemaining] = useState(0);


  let investors = 0;
  if (borrow.investors && borrow.investors.length) {
    investors = borrow.investors.length;
  }

  useEffect(() => {
    if (!borrow) return;

    setStartDate(getDate(borrow.createTime));
    setClosedDate(getDate(borrow.closeTime));

  }, [borrow]);

  useEffect(() => {
    if (borrow) {
      const remaining = Number(borrow?.startTime) + Number(borrow?.borrowingPeriod) - Math.floor(Date.now() / 1000);
      setTimeRemaining(remaining);

      if (timeRemaining < 0) return;
      const intervalId = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);


          setsecs(Math.floor((timeRemaining) % 60));
          setmins(Math.floor((timeRemaining / 60) % 60));
          sethours(Math.floor((timeRemaining / 60 / 60) % 24));
          setdays(Math.floor((timeRemaining / 60 / 60 / 24)));
      }, 1000);
      return () => clearInterval(intervalId);

    }
    
  }, [borrow, timeRemaining]);

  return (
    <div className={borrow.status === 0 ? styles.card : styles.card + ' ' + styles.card_unactive } onClick={() => navigate(`/borrows/${Number(borrow.borrowId)}`)}>
      <div className={styles.head}>
        <CompanyLogo src={borrow.image} alt={borrow.companyName} />
        <Status status={borrow.status} />
      </div>
      
      <div className={styles.company}>
        <p className={styles.desc}>{borrow.description}</p>
        <p className={styles.name}>{borrow.companyName}</p>
        
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
          <p className={styles.details_text}>Start at</p>
          <p className={styles.details_amount}>{startDate}</p>
        </div>}

        {borrow.status === 1 && 
        <div className={styles.details_item}>
          <p className={styles.details_text}>Ends in</p>
          <p className={styles.details_amount}>{`${days}d ${hours}h`}</p>
        </div>}

        {borrow.status === 2 && 
        <div className={styles.details_item}>
          <p className={styles.details_text}>Closed at</p>
          <p className={styles.details_amount}>{closetDate}</p>
        </div>}

        {borrow.status === 3 && 
        <div className={styles.details_item}>
          <p className={styles.details_text}>Closed at</p>
          <p className={styles.details_amount}>{closetDate}</p>
        </div>}

      </div>
    </div>
  )
};

export default BorrowCard;

