import styles from "./Home.module.css";
import LayoutPage from "../layout/Layout";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import logo from '../../images/mainlogo.png'

const Home = () => {

  const navigate = useNavigate();

  return (
    <LayoutPage>
        <div className={styles.mainInfo}>
          <div className={styles.info}>
            <h1>BLOCKCHAIN <span className={styles.fut}>FUNDING</span> <br></br>IS THE FUTURE</h1>

            <div className={styles.buttonsBox}>
              <Button onClick={() => navigate('/borrows')} title={"GO TO INVEST"} />
              <Button style={{ backgroundColor: 'transparent', border: '1px solid black', color: 'black' }} title={"GET A BORROW"} />
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

    </LayoutPage>
  )
};

export default Home;