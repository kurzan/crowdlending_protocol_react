import { useEffect } from "react";
import BorrowsList from "../../components/BorrowsList/BorrowsList";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import LayoutPage from "../layout/Layout";

const Home = () => {
 
  return(
      <LayoutPage>
        <BorrowsList />
      </LayoutPage>
  )
};

export default Home;