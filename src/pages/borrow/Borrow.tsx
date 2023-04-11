import { useState } from "react";
import CompanyLogo from "../../components/CompanyLogo/CompanyLogo";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Borrow.module.css";
import Button from "../../components/Button/Button";
import Box from "../../components/Box/Box";
import { useData } from "../../hooks/useData";
import { useParams } from "react-router-dom";


const Borrow = () => {

  const { id } = useParams(); 
  const {borrows, isLoading} = useData();

  const currentBorrow = borrows?.find(borrow => borrow.id === id);

  return (
    <>
      <Header/>
      <main className={styles.container}>
        <div className={styles.header}>

          <div className={styles.companyInfo}>
            <div className={styles.companyLogo}>
              <CompanyLogo src={currentBorrow?.image} alt={currentBorrow?.companyName} />
            </div>
            <p>{currentBorrow?.companyName}</p>
          </div>
          <Button title="Инвестировать" />
        </div>

        <Box title="Детали займа">

        </Box>  

        <Box title="О компании">
          <p>{currentBorrow?.info}</p>
        </Box>  

      </main>
      <Footer/>
    </>
  )
};

export default Borrow;