import styles from "./Header.module.css";
import logo from '../../images/logo2.png';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Tabs from "../Tabs/Tabs";

const Header = ({nav} : {nav?: boolean}) => {
  return(
    <header className={styles.header}>
        <div className={styles.logobox}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.tabs} >
          {nav && <Tabs />}
        </div>
        <ConnectButton/>
    </header>
  )
};

export default Header;
