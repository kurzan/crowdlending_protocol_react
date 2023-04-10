import BorrowsList from "../../components/BorrowsList/BorrowsList";
import styles from "./Home.module.css";

const Home = () => {
  return(
    <main className={styles.container}>
      <BorrowsList />
    </main>
  )
};

export default Home;