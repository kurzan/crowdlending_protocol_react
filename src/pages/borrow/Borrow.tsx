import { useEffect, useState } from "react";
import CompanyLogo from "../../components/CompanyLogo/CompanyLogo";
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
import { MdKeyboardArrowLeft, MdQueryBuilder } from 'react-icons/md';
import CoinIcon from "../../components/CoinIcon/CoinIcon";
import { getDate } from "../../services/utils";
import Investors from "../../components/Investors/Investors";
import LayoutPage from "../layout/Layout";
import ShortAddress from "../../components/ShortAddress/ShortAddress";
import tgIcon from '../../images/socials/tg.svg';
import twIcon from '../../images/socials/icons8-twitter.svg';
import disIcon from '../../images/socials/icons8-discord.svg';
import ShareLinks from "../../components/ShareLinks/ShareLinks";
import CompanyStatus from "../../components/CompanyStatus/CompanyStatus";

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
  const alreadyInvest = currentBorrow?.investors.find(item => item.investor === address);
  const investors = currentBorrow?.investors.filter(item => Number(item.amount) > 0).length;

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

  useEffect(() => {
    console.log(currentBorrow)
  }, [currentBorrow])

  return (
    <LayoutPage nav>

      <div className={styles.preheader}>
        <Link to={-1 as any} className={styles.back}>
          <>
            <MdKeyboardArrowLeft size={25} />
            <p>Back</p>
          </>
        </Link>

        <div className={styles.share}>
          <ShareLinks />
        </div>
      </div>

      <div className={styles.header}>

        <div className={styles.companyInfo}>
          <div className={styles.companyLogo}>
            {!currentBorrow ? <Skeleton width={48} height={48} /> : <CompanyLogo src={currentBorrow?.image} alt={currentBorrow?.companyName} />}
          </div>
          <div className={styles.companyTexts}>
            <p className={styles.borrowId}>№ {Number(currentBorrow?.borrowId)}</p>
            <div className={styles.companyNameBox}>
              <p className={styles.companyName}>{currentBorrow?.companyName}</p>
              <CompanyStatus verified={true}/>
            </div>
            
          </div>
        </div>

        <div className={styles.statusBox}>
          {Number(currentBorrow?.status) === 1 && <div className={styles.timerBox}>
            <MdQueryBuilder />
            <p className={styles.timer}>Ends in: {`${days}d ${hours}h ${mins}m ${secs}s`}</p>
          </div>}
          <Status status={currentBorrow?.status} />
        </div>

      </div>

      {!currentBorrow ? <Skeleton height={100} /> : <Box >
        <div className={styles.details}>
          <div className={styles.details_item}>
            <p className={styles.details_text}>Created at</p>
            <p className={styles.details_amount}>{getDate(currentBorrow?.createTime)}</p>
          </div>
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
      </Box>}

      {(currentBorrow?.status === 0 && !alreadyInvest) && <div className={styles.button}>
        <Button disabled={Number(currentBorrow?.status) !== 0 || !isConnected ? true : false} onClick={modalHandler} title="Invest" />
      </div>}
      <Box title="About borrower">
        <p className={styles.aboutBorrower}>{currentBorrow?.info}</p>
        <div className={styles.socials}>
          {borrows && <ShortAddress address={currentBorrow?.borrower} />}
          <img src={tgIcon} width={24} height={24} alt="" />
          <img src={twIcon} width={24} height={24} alt="" />
          <img src={disIcon} width={24} height={24} alt="" />
        </div>
      </Box>

      {investors ? <Investors title={`Investors (${investors})`} currentBorrow={currentBorrow} /> : null}

      {modalIsOpen && <Modal onClose={modalHandler} title="Enter amount">
        <InvestField id={id} currentBorrow={currentBorrow} />
      </Modal>}

    </LayoutPage>
  )
};

export default Borrow;