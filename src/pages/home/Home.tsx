import BorrowsList from "../../components/BorrowsList/BorrowsList";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";

const Home = () => {
  return(
    <>
      <Header />
      <main className={styles.container}>
        <BorrowsList />
      </main>
      <Footer />
    </>

  )
};

export default Home;