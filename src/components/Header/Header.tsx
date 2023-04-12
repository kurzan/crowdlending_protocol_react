import styles from "./Header.module.css";
import logo from '../../images/logo.png';
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return(
    <header className={styles.header}>
      <div className={styles.elements}>
        <div className={styles.logobox}>
          <img src={logo} alt="" />
        </div>
        <ConnectButton/>
      </div>
    </header>
  )
};

export default Header;
