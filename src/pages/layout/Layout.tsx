import { ReactNode } from "react";
import styles from "./Layout.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Tabs from "../../components/Tabs/Tabs";
import MobileNav from "../../components/MobileNav/MobileNav";
import { Outlet } from "react-router-dom";
import { mainNavTabs } from "../../services/tabs";

const LayoutPage = ({nav = true}:{nav?: boolean}) => {
 
  return(
    <div className={styles.page}>
        <div className={styles.body}>
            <Header nav={nav ? true: false} />
            <main className={styles.container}>
                <Outlet />
            </main>
        </div>
        <Footer />
        <div className={styles.mobileNav}>
          <MobileNav tabs={mainNavTabs} />
        </div>
        
    </div>
  )
};

export default LayoutPage;