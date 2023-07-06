import styles from "./Header.module.css";
import logo from '../../images/logo2.png';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Tabs from "../Tabs/Tabs";
import { useNavigate } from "react-router-dom";
import { mainNavTabs } from "../../services/tabs";
import { useTranslation } from "react-i18next";

type TLng = {

}


const lngs = {
  en: {nativeName: "English"},
  ru: {nativeName: "Russian"}
};

const Header = ({ nav }: { nav?: boolean }) => {

  const { i18n } =useTranslation();

  const navigate = useNavigate();

  return (
    <>
      <header className={styles.header}>
        <div onClick={() => navigate('/')} className={styles.logobox}>
          <img src={logo} alt="" />
          <p>Early Bird</p>
        </div>
        <div className={"d-none d-md-block " + styles.tabs} >
          {nav && <Tabs tabs={mainNavTabs} />}
        </div>
        <div>
          {Object.keys(lngs).map((lng) => (
            <button type="submit" key={lng} onClick={() => i18n.changeLanguage(lng)}>{lngs[lng as keyof typeof lngs].nativeName}</button>
          ))}
          <ConnectButton />
        </div>
        
      </header>
    </>
  )
};

export default Header;
