import BorrowsList from "../../components/BorrowsList/BorrowsList";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Stats from "../../components/Stats/Stats";
import styles from "./Portfolio.module.css";

const Portfolio = () => {
  return(
    <>
      <Header nav />
      <main className={styles.container}>
        <Stats />
      </main>
      <Footer />
    </>
  )
};

export default Portfolio;