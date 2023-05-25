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
        <a href={`https://testnet.bscscan.com/address/${contract.address}`} target="_blank" rel="noreferrer"><img src={binanceImg} alt={"BNB Chain"} width="22px" height="22px" /></a>
      </div>

      <div className={styles.socials}>
        <a href="./for_investors.pdf" target="blank_" className={styles.investorsText}>For investors</a>
        <a href="https://twitter.com/EarlyBirdFi" target="blank_">Twitter</a>
        <a href="https://t.me/earlybird_chat" target="blank_">Telegram</a>
      </div>

    </footer>
  )
};

export default Footer;