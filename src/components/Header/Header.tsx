import styles from "./Header.module.css";
import logo from '../../images/logo2.png';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Tabs from "../Tabs/Tabs";
import { useNavigate } from "react-router-dom";
import { getLocalizedMainNavTabs } from "../../services/tabs";
import { useTranslation } from "react-i18next";
import LngHandler from "../LngHandler/LngHandler";


const Header = ({ nav }: { nav?: boolean }) => {

  const { t } = useTranslation();

  const localizedMainNavTabs = getLocalizedMainNavTabs(t);

  const navigate = useNavigate();

  return (
    <>
      <header className={styles.header}>
        <div onClick={() => navigate('/')} className={styles.logobox}>
          <img src={logo} alt="" />
          <p>Early Bird</p>
        </div>
        <div className={"d-none d-md-block " + styles.tabs} >
          {nav && <Tabs tabs={localizedMainNavTabs} />}
        </div>
        <div className={styles.rightMenu}>
          <LngHandler />
          <ConnectButton />
        </div>
      </header>
    </>
  )
};

export default Header;
