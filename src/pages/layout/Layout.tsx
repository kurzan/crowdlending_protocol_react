import styles from "./Layout.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import MobileNav from "../../components/MobileNav/MobileNav";
import { Outlet } from "react-router-dom";
import { getLocalizedMainNavTabs } from "../../services/tabs";
import { useTranslation } from "react-i18next";

const LayoutPage = ({nav = true}:{nav?: boolean}) => {

  const { t } = useTranslation();

  const localizedMainNavTabs = getLocalizedMainNavTabs(t);
 
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
          <MobileNav tabs={localizedMainNavTabs} />
        </div>
        
    </div>
  )
};

export default LayoutPage;