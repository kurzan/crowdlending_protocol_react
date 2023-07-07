import { useTranslation } from "react-i18next";
import DropDown from "../DropDown/DropDown";
import rU from '../../images/lang/ru.svg';
import eN from '../../images/lang/en-us.svg';
import styles from './LngHandler.module.css';

const lngs = {
  ru: { nativeName: "Русский", img: rU },
  en: { nativeName: "English", img: eN }
};

const LngHandler = () => {

  const { i18n } = useTranslation();

  return (
    <DropDown img={i18n.language === "ru" ? rU : eN} height="30px" width="30px">
      {Object.keys(lngs).map((lng) => (
        <div className={styles.item}>
          <img src={lngs[lng as keyof typeof lngs].img} alt="" height="25px" width="25px"/>
          <p key={lng} onClick={() => i18n.changeLanguage(lng)}>{lngs[lng as keyof typeof lngs].nativeName}</p>
        </div>
      ))}
    </DropDown>
  )
};

export default LngHandler;