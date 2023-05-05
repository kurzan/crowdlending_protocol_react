import styles from "./Header.module.css";
import logo from '../../images/logo2.png';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Tabs from "../Tabs/Tabs";
import { useNavigate } from "react-router-dom";

const Header = ({ nav }: { nav?: boolean }) => {

  const navigate = useNavigate();

  return (
    <>
      <header className={styles.header}>
        <div onClick={() => navigate('/')} className={styles.logobox}>
          <img src={logo} alt="" />
          <p>Early Bird</p>
        </div>
        <div className={styles.tabs} >
          {nav && <Tabs />}
        </div>
        <ConnectButton />
      </header>
    </>
  )
};

export default Header;
