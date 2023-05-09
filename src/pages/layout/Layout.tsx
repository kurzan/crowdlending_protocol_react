import { ReactNode } from "react";
import styles from "./Layout.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Tabs from "../../components/Tabs/Tabs";

const LayoutPage = ({children, nav = true}:{children: ReactNode, nav?: boolean}) => {
 
  return(
    <div className={styles.page}>
        <div className={styles.body}>
            <Header nav={nav ? true: false} />
            <main className={styles.container}>
                {children}
            </main>
        </div>
        <Footer />
        <div className={styles.mobileNav}>
          <Tabs />
        </div>
        
    </div>
  )
};

export default LayoutPage;