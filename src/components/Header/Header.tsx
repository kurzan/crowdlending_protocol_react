import styles from "./Header.module.css";

const Header = () => {
  return(
    <header className={styles.header}>
      <div className={styles.elements}>
        <p className={styles.company}>Crowdlending Protocol</p>
        <p>Connect Wallet</p>
      </div>
    </header>
  )
};

export default Header;