import PortfolioList from "../../components/PortfolioList/PortfolioList";
import Stats from "../../components/Stats/Stats";
import LayoutPage from "../layout/Layout";
import styles from "./Portfolio.module.css";

const Portfolio = () => {
  return(

    <LayoutPage>
        <div className={styles.heading}>
          <Stats />
        </div>
        <PortfolioList />
    </LayoutPage>
  )
};

export default Portfolio;