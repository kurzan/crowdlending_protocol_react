import styles from "./Header.module.css";
import logo from '../../images/logo.png';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Tabs from "../Tabs/Tabs";

const Header = () => {
  return(
    <header className={styles.header}>
        <div className={styles.logobox}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.tabs} >
          <Tabs />
        </div>
        <ConnectButton/>
    </header>
  )
};

export default Header;
