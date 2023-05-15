import styles from "./Home.module.css";
import LayoutPage from "../layout/Layout";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import logo from '../../images/Vector.png'
import Stats from "../../components/Stats/Stats";
import { useEffect, useState } from "react";

const Home = () => {

  const navigate = useNavigate();

  const [blockchain, setBlockchain] = useState('');
  const blockchainText = 'BLOCKCHAIN';
  const [index, setIndex] = useState(0);

  return (
    <LayoutPage>

      <div className="container">
        <div className={styles.mainInfo}>
          <div className={styles.info}>
            <h1 className={styles.heading}><p className={styles.animatedText}>BLOCKCHAIN</p> <span className={styles.fut}>FUNDING</span> <br></br>IS THE FUTURE</h1>

            <Stats />

            <div className={styles.buttonsBox}>
              <Button type="button" onClick={() => navigate('/borrows')} title={"GO TO INVEST"} />
              <Button type="button" style={{ backgroundColor: 'transparent', border: '1px solid black', color: 'black' }} title={"GET A BORROW"} />
            </div>

            <div className={styles.description}>
              <p>
                Early Bird uses smart contracts to provide loans to companies, significantly reducing the cost of raising funds. Connect your wallets to get started.
              </p>
            </div>

          </div>

          <div className={styles.bigLogo}>
            <img src={logo} alt="" />
          </div>
        </div>
        
      </div>



    </LayoutPage>
  )
};

export default Home;