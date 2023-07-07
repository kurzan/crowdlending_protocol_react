import styles from "./Home.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import logo from '../../images/Vector.png'
import Stats from "../../components/Stats/Stats";
import { useTranslation } from "react-i18next";

const Home = () => {

  const { t } = useTranslation();

  const navigate = useNavigate();

  return (


      <div className="container">
        <div className={styles.mainInfo}>
          <div className={styles.info}>
            <h1 className={styles.heading}><p className={styles.animatedText}>BLOCKCHAIN</p> <span className={styles.fut}>FUNDING</span> <br></br>IS THE FUTURE</h1>

            <Stats />

            <div className={styles.buttonsBox}>
              <Button type="button" onClick={() => navigate('/borrows')} title={t("GO TO INVEST")} />
              <Button type="button" onClick={() => navigate('borrows/addborrow')} style={{ backgroundColor: 'transparent', border: '1px solid black', color: 'black' }} title={t("GET A BORROW")} />
            </div>

            <div className={styles.description}>
              <p>
                {t("About")}
              </p>
            </div>

          </div>

          <div className={styles.bigLogo}>
            <img src={logo} alt="" />
          </div>
        </div>
      </div>



  )
};

export default Home;