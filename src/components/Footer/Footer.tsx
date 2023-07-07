import styles from "./Footer.module.css";
import binanceImg from '../../images/Binancefooter.svg';
import siberiumImg from '../../images/siberiumfooter.svg';
import { contract, contractBnb } from "../../services/web3config";
import { useTranslation } from "react-i18next";

const Footer = () => {

  const { t } = useTranslation();

  return(
    <footer className={styles.footer}>
      <div className={styles.info}>
        <div className={styles.copyrights}>
          <p>© 2023 Early Bird </p>
        </div>
        
        <p>{t("Supported Chains")}</p>
        <a href={`https://explorer.test.siberium.net/address/${contract.address}`} target="_blank" rel="noreferrer"><img src={siberiumImg} alt={"BNB Chain"} width="22px" height="22px" /></a>
        <a href={`https://testnet.bscscan.com/address/${contractBnb.address}`} target="_blank" rel="noreferrer"><img src={binanceImg} alt={"BNB Chain"} width="22px" height="22px" /></a>
      </div>

      <div className={styles.socials}>
        <a href="./for_investors.pdf" target="blank_" className={styles.investorsText}>{t("For investors")}</a>
        <a href="https://twitter.com/EarlyBirdFi" target="blank_">Twitter</a>
        <a href="https://t.me/earlybird_chat" target="blank_">Telegram</a>
      </div>

    </footer>
  )
};

export default Footer;