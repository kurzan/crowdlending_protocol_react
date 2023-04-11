import styles from "./Footer.module.css";
import binanceImg from "../../images/Binancefooter.svg";

const Footer = () => {
  return(
    <footer className={styles.footer}>
      {/* <Image src={binanceImg} alt="Binance Chain" /> */}
      <a href="https://testnet.bscscan.com/address/0x61c0a8c1ea7e715f3dbf0365b56e4ee57be51e22" target="_blank">Contract address</a>
    </footer>
  )
};

export default Footer;