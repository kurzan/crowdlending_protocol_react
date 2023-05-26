import { useEffect, useState } from "react";
import CompanyLogo from "../../components/CompanyLogo/CompanyLogo";
import styles from "./Borrow.module.css";
import Button from "../../components/Button/Button";
import Box from "../../components/Box/Box";
import Modal from "../../components/Modal/Modal";
import InvestField from "../../components/InvestField/InvestField";
import { useData, useInputAmount } from "../../hooks/useData";
import { Link, useParams } from "react-router-dom";
import { useAccount, useBalance, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { ethers } from "ethers";
import Status from "../../components/Status/Status";
//@ts-ignore
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import { MdKeyboardArrowLeft, MdQueryBuilder } from 'react-icons/md';
import CoinIcon from "../../components/CoinIcon/CoinIcon";
import { formattedDate, getDate, getShortAddress, getShortAmount } from "../../services/utils";
import Investors from "../../components/Investors/Investors";
import LayoutPage from "../layout/Layout";
import ShortAddress from "../../components/ShortAddress/ShortAddress";
import tgIcon from '../../images/socials/tg.svg';
import twIcon from '../../images/socials/icons8-twitter.svg';
import disIcon from '../../images/socials/icons8-discord.svg';
import ShareLinks from "../../components/ShareLinks/ShareLinks";
import CompanyStatus from "../../components/CompanyStatus/CompanyStatus";
import { contract } from "../../services/web3config";
import { Oval } from "react-loader-spinner";
import doneImg from '../../images/done.svg';
import TooltipBox from "../../components/TooltipBox/TooltipBox";
import BorrowControl from "../../components/BorrowControl/BorrowControl";
import moment from 'moment';

const Borrow = () => {
  const [verifiedBorrower, setVerifiedBorrower] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalWaitIsOpen, setModalWaitIsOpen] = useState(false);
  const [modalDoneIsOpen, setModalDoneIsOpen] = useState(false);

  const { inputValue } = useInputAmount();

  const [days, setdays] = useState(0);
  const [hours, sethours] = useState(0);
  const [mins, setmins] = useState(0);
  const [secs, setsecs] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const { id } = useParams();
  const { borrows, borrowers } = useData();
  const { address, isConnected } = useAccount();

  const currentBorrow = borrows?.find(borrow => Number(borrow.borrowId) === Number(id));
  const currentBorrowwer = currentBorrow?.borrower === address;
  const alreadyInvest = currentBorrow?.investors.find(item => item.investor === address);
  const investors = currentBorrow?.investors.filter(item => Number(item.amount) > 0).length;

  const endDate = Number(currentBorrow?.startTime) + Number(currentBorrow?.borrowingPeriod);
  const expired = Date.now() > endDate*1000;

  useEffect(() => {

    if(borrowers && borrowers.find(item => item.borrower === currentBorrow?.borrower)) {
      setVerifiedBorrower(true)
    } else {
      setVerifiedBorrower(false)
    }

}, [borrowers, currentBorrow?.borrower])

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

  const { config, error, isLoading: prepareLoading } = usePrepareContractWrite({
    address: contract.address,
    abi: contract.abi,
    functionName: 'invest',
    args: [id],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(inputValue.toString())
    }
  });

  const { data: investData, isLoading: isLoadingInvestData, isSuccess, write, reset } = useContractWrite({
    ...config,
    onSuccess(data) {
      setModalIsOpen(false);
      setModalWaitIsOpen(true);
    },
  });

  const { data: dataWaitInvest, isError: errorWaitInvest, isLoading: loadingWaitInvest } = useWaitForTransaction({
    hash: investData?.hash,
    onSuccess(data) {
      setModalWaitIsOpen(false);
      setModalDoneIsOpen(true);
    },
  })


  const modalHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const modalWaitHandler = () => {
    setModalWaitIsOpen(!modalWaitIsOpen);
  };

  const modalDoneHandler = () => {
    setModalDoneIsOpen(!modalDoneIsOpen);
  };

  return (
    <>

      <div className={styles.preheader}>
        <Link to={-1 as any} className={styles.back}>
          <>
            <MdKeyboardArrowLeft size={25} />
            <p>Back</p>
          </>
        </Link>

        <div className={styles.share}>
          <ShareLinks currentBorrow={currentBorrow}/>
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
              {verifiedBorrower ? <p className={styles.companyName}>{currentBorrow?.companyName}</p> : <p className={styles.companyName}>{getShortAddress(currentBorrow?.borrower)}</p>}
              <CompanyStatus verified={verifiedBorrower}/>
            </div>
            
          </div>
        </div>

        <div className={styles.statusBox}>
          {Number(currentBorrow?.status) === 1 && currentBorrow && !expired && <div className={styles.timerBox}>
            <MdQueryBuilder />
            <TooltipBox tooltipText={formattedDate(endDate)} >
              <p className={styles.timer}>Ends in: {`${days}d ${hours}h ${mins}m ${secs}s`}</p>
            </TooltipBox>
          </div>}
          {Number(currentBorrow?.status) === 1 && currentBorrow && expired && <div className={styles.expectedBox}>
            <p>⚠️ Borrower expected to pay {formattedDate(endDate)}</p>
          </div>}
          <Status status={currentBorrow?.status} />
        </div>

      </div>

      {!currentBorrow ? <Skeleton height={100} /> : <Box bg={!verifiedBorrower ? "#FFF3E0" : ""}>
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
                {currentBorrow?.totalBorrowed ? getShortAmount((Number(ethers.utils.formatEther(currentBorrow.totalBorrowed))).toString()) : 0}/
                {currentBorrow?.totalBorrowed ? Number(ethers.utils.formatEther(currentBorrow.borrowingGoal)) : 0}
              </p>
              <CoinIcon />
            </div>
          </div>
          <div className={styles.details_item}>
            <p className={styles.details_text}>Interest rate</p>
            <p className={styles.details_amount + " " + styles.rate_text}>{Number(currentBorrow?.interestRate)}%</p>
          </div>
        </div>
      </Box>}

      {currentBorrowwer && <BorrowControl currentBorrow={currentBorrow}/>}

      {(currentBorrow?.status === 0 && !alreadyInvest && !currentBorrowwer) && <div className={styles.button}>
        <Button disabled={Number(currentBorrow?.status) !== 0 || !isConnected ? true : false} onClick={modalHandler} title={verifiedBorrower ? "Invest 🔥" : "Invest ⚠" }/>   
      </div>}
      <Box title="About borrower" bg={!verifiedBorrower ? "#FFF3E0" : ""}>
        <p className={styles.aboutBorrower}>{currentBorrow?.info}</p>
        {verifiedBorrower ? (<div className={styles.socials}>
          {borrows && <ShortAddress address={currentBorrow?.borrower} />}
          <img src={tgIcon} width={24} height={24} alt="" />
          <img src={twIcon} width={24} height={24} alt="" />
          <img src={disIcon} width={24} height={24} alt="" />
        </div>) : <p>⚠ Unverified borrower. Hight risk to invest ⚠</p>
        }
      </Box>

      {investors ? <Investors title={`Investors (${investors})`} currentBorrow={currentBorrow} /> : null}

      {modalIsOpen && <Modal onClose={modalHandler} title="Enter amount">
        <InvestField error={error} id={id} currentBorrow={currentBorrow} button={ <Button onClick={write} isLoading={isLoadingInvestData || loadingWaitInvest} disabled={prepareLoading || isLoadingInvestData || error || loadingWaitInvest ? true : false} title={!isLoadingInvestData ? "Invest" : "Pending..."} />} />
      </Modal>}


      {modalWaitIsOpen && (
          <Modal onClose={modalWaitHandler}>
            <div className={styles.waitContainer}>
            <p>Wait for confirmations...</p>
            <Oval
              height={60}
              width={60}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={4}
              strokeWidthSecondary={2}
            />
            </div>
          </Modal>
        )}


        {modalDoneIsOpen && (
          <Modal onClose={modalDoneHandler}>
            <div className={styles.waitContainer}>
              <p className={styles.modalHeading}>Congratulations</p>
              <img src={doneImg} alt="done" />
              <p className={styles.modalSubHeading}>You successfuly invested <span className={styles.modalSpan}>{inputValue}</span> in <span className={styles.modalSpan}>{currentBorrow?.companyName}</span></p>
              <a href={`https://testnet.bscscan.com/tx/${investData?.hash}`} target="_blanc">View transaction</a>
              <a href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fearlybird.finance%2Fborrows%2F${currentBorrow?.borrowId}&text=I%20invested%20${inputValue}%20tBNB%20at%20%40EarlyBirdFi%20check%20it%3A`} target="_blanc">Share to Twitter</a>
            </div>
          </Modal>
        )}  


    </>
  )
};

export default Borrow;