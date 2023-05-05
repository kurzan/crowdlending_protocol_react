import styles from "./Footer.module.css";
import binanceImg from '../../images/Binancefooter.svg'
import { contract } from "../../services/web3config";

const Footer = () => {
  return(
    <footer className={styles.footer}>
      <div className={styles.info}>
        <div className={styles.copyrights}>
          <p>© 2023 Early Bird </p>
        </div>
        
        <p>Supported Chains</p>
        <img src={binanceImg} alt={"BNB Chain"} width="22px" height="22px" />
      </div>

      <div className={styles.socials}>
        <p>Twitter</p>
        <p>Telegram</p>
      </div>

    </footer>
  )
};

export default Footer;