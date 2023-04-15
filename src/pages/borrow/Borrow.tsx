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
import { useParams } from "react-router-dom";
import { useAccount } from 'wagmi';
import { ethers } from "ethers";
import Status from "../../components/Status/Status";
//@ts-ignore
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

import { Store } from 'react-notifications-component';

const Borrow = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [days, setdays] = useState(0);
  const [hours, sethours] = useState(0);
  const [mins, setmins] = useState(0);
  const [secs, setsecs] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const { id } = useParams(); 
  const {borrows} = useData();
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
    
  }, [currentBorrow, timeRemaining])



  const modalHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  useEffect(() => {
    Store.addNotification({
      title: "Wonderful!",
      message: "teodosii@react-notifications-component",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  }, [])

  return (
    <>
      <Header/>
      <main className={styles.container}>
        <div className={styles.header}>

          <div className={styles.companyInfo}>
            <div className={styles.companyLogo}>
              {!currentBorrow? <Skeleton width={48} height={48} /> : <CompanyLogo src={currentBorrow?.image} alt={currentBorrow?.companyName} />}
            </div>
            <p>{currentBorrow?.companyName}</p>
            <Status status={currentBorrow?.status}/>
            { Number(currentBorrow?.status) === 1 && <p>Выплата через: {`${days} дней, ${hours} часов, ${mins} минут, ${secs} секунд`}</p>}
          </div>
          <Button disabled={Number(currentBorrow?.status) !== 0 || !isConnected ? true : false} onClick={modalHandler} title="Инвестировать" />
        </div>

        <Box title="Детали займа">
          <div className={styles.details}>

            <div className={styles.details_item}>
              <p className={styles.details_amount}>{Number(currentBorrow?.borrowingPeriod) / 86400}</p>
              <p className={styles.details_text}>Срок займа, дней</p>
            </div>

            <div className={styles.details_item}>
              <p className={styles.details_amount}>{currentBorrow?.totalBorrowed ? Number(ethers.utils.formatEther(currentBorrow.totalBorrowed)) : 0} tBNB</p>
              <p className={styles.details_text}>Собрано средств</p>
            </div>

            <div className={styles.details_item}>
              <p className={styles.details_amount}>{currentBorrow?.borrowingGoal ? Number(ethers.utils.formatEther(currentBorrow.borrowingGoal)) : 0} tBNB</p>
              <p className={styles.details_text}>Необходимо собрать</p>
            </div>

            <div className={styles.details_item}>
              <p className={styles.details_amount}>{Number(currentBorrow?.interestRate)}%</p>
              <p className={styles.details_text}>Ставка, годовых</p>
            </div>
            
          </div>
  
        </Box>  

        <Box title="О компании">
          <p>{currentBorrow?.info}</p>
        </Box>  

        {modalIsOpen && <Modal onClose={modalHandler} title="Введите сумму">
          <InvestField id={id} currentBorrow={currentBorrow} />
        </Modal>}

      </main>
      <Footer/>
    </>
  )
};

export default Borrow;