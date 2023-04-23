import { useEffect, useState } from "react";
import CompanyLogo from "../../components/CompanyLogo/CompanyLogo";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Borrow.module.css";
import Button from "../../components/Button/Button";
import Box from "../../components/Box/Box";
import Modal from "../../components/Modal/Modal";
import InvestField from "../../components/InvestField/InvestField";
import { useData } from "../../hooks/useData";
import { Link, useParams } from "react-router-dom";
import { useAccount } from 'wagmi';
import { ethers } from "ethers";
import Status from "../../components/Status/Status";
//@ts-ignore
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import CoinIcon from "../../components/CoinIcon/CoinIcon";


const Borrow = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [days, setdays] = useState(0);
  const [hours, sethours] = useState(0);
  const [mins, setmins] = useState(0);
  const [secs, setsecs] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const { id } = useParams();
  const { borrows } = useData();
  const { address, isConnected } = useAccount();

  const currentBorrow = borrows?.find(borrow => Number(borrow.borrowId) === Number(id));

  useEffect(() => {
    if (currentBorrow) {
      const remaining = Number(currentBorrow?.startTime) + Number(currentBorrow?.borrowingPeriod) - Math.floor(Date.now() / 1000);
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

  }, [currentBorrow, timeRemaining]);

  const modalHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Header />
      <div className={styles.timerBox}>
        {Number(currentBorrow?.status) === 1 && <p className={styles.timer}>Ends in: {`${days}d ${hours}h ${mins}m ${secs}s`}</p>}
      </div>
      <main className={styles.container}>
        <Link to={"/"} className={styles.back}>
          <>
            <MdKeyboardArrowLeft size={25} />
            <p>Back</p>
          </>
        </Link>

        <div className={styles.header}>

          <div className={styles.companyInfo}>
            <div className={styles.companyLogo}>
              {!currentBorrow ? <Skeleton width={48} height={48} /> : <CompanyLogo src={currentBorrow?.image} alt={currentBorrow?.companyName} />}
            </div>
            <div className={styles.companyTexts}>
              <p className={styles.borrowId}>№ {Number(currentBorrow?.borrowId)}</p>
              <p className={styles.companyName}>{currentBorrow?.companyName}</p>
            </div>

          </div>
          <Status isBorder={true} status={currentBorrow?.status} />
        </div>

        <Box >

          <div className={styles.details}>

            <div className={styles.details_item}>
              <p className={styles.details_text}>Period, days</p>
              <p className={styles.details_amount}>{Number(currentBorrow?.borrowingPeriod) / 86400}</p>
            </div>


            <div className={styles.details_item}>
              <p className={styles.details_text}>Total borrowed</p>
              <div className={styles.coins_amount}>
                <p className={styles.details_amount}>
                  {currentBorrow?.totalBorrowed ? Number(ethers.utils.formatEther(currentBorrow.totalBorrowed)) : 0}/ 
                  {currentBorrow?.totalBorrowed ? Number(ethers.utils.formatEther(currentBorrow.borrowingGoal)) : 0}
                </p>
                <CoinIcon />
              </div>
            </div>


            <div className={styles.details_item}>
              <p className={styles.details_text}>Interest rate</p>
              <p className={styles.details_amount}>{Number(currentBorrow?.interestRate)}%</p>
            </div>

          </div>

          

        </Box>

        {currentBorrow?.status === 0 && <div className={styles.button}>
          <Button disabled={Number(currentBorrow?.status) !== 0 || !isConnected ? true : false} onClick={modalHandler} title="Invest" />         
        </div>}

        <Box title="About company">
          <p>{currentBorrow?.info}</p>
        </Box>

        {modalIsOpen && <Modal onClose={modalHandler} title="Enter amount">
          <InvestField id={id} currentBorrow={currentBorrow} />
        </Modal>}

      </main>
      <Footer />
    </>
  )
};

export default Borrow;