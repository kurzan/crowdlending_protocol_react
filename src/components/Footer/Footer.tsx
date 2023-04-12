import styles from "./Footer.module.css";
import binanceImg from '../../images/Binancefooter.svg'
import { contract } from "../../services/web3config";

const Footer = () => {
  return(
    <footer className={styles.footer}>
      <p>Z2H Team 2023</p>
      <img src={binanceImg} alt={"BNB Chain"} width="32px" height="32px" />
      <a href={`https://testnet.bscscan.com/address/${contract.address}`} target="_blank" rel="noreferrer">Contract address</a>
    </footer>
  )
};

export default Footer;