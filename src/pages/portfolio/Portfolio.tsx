import { useAccount } from "wagmi";
import PortfolioList from "../../components/PortfolioList/PortfolioList";
import Stats from "../../components/Stats/Stats";
import { useData } from "../../hooks/useData";
import LayoutPage from "../layout/Layout";
import styles from "./Portfolio.module.css";
import { TBorrow } from "../../services/types";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { MdKeyboardArrowLeft, MdQueryBuilder } from 'react-icons/md';

export type TPortfolio = Partial<TBorrow> & { amount?: number }

const Portfolio = () => {

  const { borrows } = useData();
  const { address, isConnected } = useAccount();

  const navigate = useNavigate();

  const portfolio = borrows?.reduce((acc: TPortfolio[], borrow) => {
    const investor = borrow.investors.find((x) => x.investor === address);
    if (investor) {
        acc.push({
            borrowId: Number(borrow.borrowId),
            amount: Number(investor.amount),
            companyName: borrow.companyName,
            description: borrow.description,
            interestRate: borrow.interestRate,
            borrowingPeriod: borrow.borrowingPeriod,
            status: borrow.status,
            image: borrow.image
        });
    }
    return acc;
}, []);

  const portfolioCount = portfolio?.length;
  const portfolioVolume = portfolio && portfolio?.reduce((acc, item) => Number(item.amount) + acc, 0) / 10**18;
  const avgRate = portfolio && portfolio?.reduce((acc, item) => Number(item.interestRate) + acc, 0) / portfolio?.length;


  return(

    <LayoutPage>
        <div className={styles.heading}>
          {portfolioCount && portfolioCount > 0 ?
          <p>
            You invested <span className={styles.assets}>{portfolioVolume} tBNB</span> in <span className={styles.assets}>{portfolioCount}</span> project with avg rate <span className={styles.assets}>~{avgRate?.toFixed(2)}%</span> 
          </p> : null
          }
          {!isConnected && <p>Connect your wallets to get started</p>}
          {isConnected && !portfolioCount && <p>Your portfolio is emty</p> }
        </div>
        {portfolioCount && portfolioCount > 0 ? <PortfolioList portfolio={portfolio} /> : <Button style={{width: "200px", margin: "0 auto"}} onClick={() => navigate('/borrows')}  title={"GO TO INVEST"} />}
        
    </LayoutPage>
  )
};

export default Portfolio;