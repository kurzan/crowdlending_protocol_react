import { useState } from "react";
import CompanyLogo from "../../components/CompanyLogo/CompanyLogo";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Borrow.module.css";
import Button from "../../components/Button/Button";
import Box from "../../components/Box/Box";


type TCompany = {
  image: string,
  alt: string,
}


const mockBorrow =
  {
    id: 0,
    image: "http://localhost:3000/logos/FIVE.png",
    companyName: 'Сбербанк',
    description: 'Банковская деятельность',
    status: 'Активный',
    totalBorrowed: 0.88,
    interestRate: 3,
    info: "ПАО «Сберба́нк» — российский финансовый конгломерат, крупнейший универсальный банк России и Восточной Европы. По итогам 2019 года у Сбербанка 96,2 миллионов активных частных клиентов и 2,6 миллиона активных корпоративных клиентов. Среди крупнейших банков мира по размеру активов находится в восьмом десятке."
  };


const Borrow = () => {

  const [company, setCompany] = useState<TCompany>();


  return(
    <>
      <Header/>
      <main className={styles.container}>
        <div className={styles.header}>

          <div className={styles.companyInfo}>
            <div className={styles.companyLogo}>
              <CompanyLogo src={mockBorrow.image} alt={mockBorrow.companyName} />
            </div>
            <p>{mockBorrow.companyName}</p>
          </div>
          <Button title="Инвестировать" />
        </div>

        <Box title="Детали займа">

        </Box>  

        <Box title="О компании">
          <p>{mockBorrow.info}</p>
        </Box>  

      </main>
      <Footer/>
    </>
  )
};

export default Borrow;