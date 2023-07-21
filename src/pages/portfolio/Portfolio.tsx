import { useEffect } from "react";
import { useAccount } from "wagmi";
import PortfolioList from "../../components/PortfolioList/PortfolioList";
import { useData } from "../../hooks/useData";
import styles from "./Portfolio.module.css";
import { TBorrow } from "../../services/types";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import portfolioImg from './../../images/portfolio.svg';
import walletImg from './../../images/wallet.svg';
import { Oval } from "react-loader-spinner";
import BorrowsList from "../../components/BorrowsList/BorrowsList";
import Tabs from "../../components/Tabs/Tabs";
import { portfolioTabs } from "../../services/tabs";
import { useTranslation } from "react-i18next";


export type TPortfolio = Partial<TBorrow> & { amount?: number }

const Portfolio = () => {

  const { t } = useTranslation();

  const { borrows, isLoading } = useData();
  const { address, isConnected } = useAccount();

  const currentBorrows = borrows && borrows?.filter(borrow => borrow.borrower === address);

  const navigate = useNavigate();
  const location = useLocation();

  const portfolio = borrows?.reduce((acc: TPortfolio[], borrow) => {
    const investor = borrow.investors.find((x) => x.investor === address);
    if (investor) {
      acc.push({
        borrowId: Number(borrow.borrowId),
        borrower: borrow.borrower,
        amount: Number(investor.amount),
        companyName: borrow.companyName,
        description: borrow.description,
        interestRate: borrow.interestRate,
        borrowingPeriod: borrow.borrowingPeriod,
        status: borrow.status,
        image: borrow.image,
        startTime: borrow.startTime,
        closeTime: borrow.closeTime
      });
    }
    return acc;
  }, []);

  const ordersList = portfolio?.filter(portfolio => portfolio.status === 0);
  const upcomingList = portfolio?.filter(portfolio => portfolio.status === 1);
  const payOutList = portfolio?.filter(portfolio => portfolio.status === 2);
  const сancelledList = portfolio?.filter(portfolio => portfolio.status === 3);

  const portfolioCount = portfolio?.length;
  const portfolioVolume = portfolio && portfolio?.reduce((acc, item) => Number(item.amount) + acc, 0) / 10 ** 18;
  const avgRate = portfolio && portfolio?.reduce((acc, item) => Number(item.interestRate) + acc, 0) / portfolio?.length;

  return (

    <>

      <div className={styles.heading}>
        {location.pathname === '/portfolio/investments' && portfolioCount && portfolioCount > 0 ?
          <p>
            You invested <span className={styles.assets}>{portfolioVolume} tBNB</span> in <span className={styles.assets}>{portfolioCount}</span> project with avg rate <span className={styles.assets}>~{avgRate?.toFixed(2)}%</span>
          </p> : null
        }

        {location.pathname === '/portfolio/borrows' && portfolioCount && portfolioCount > 0 ?
          <p>
            You borrowed <span className={styles.assets}>0 tBNB</span> in <span className={styles.assets}>-</span> project with avg rate <span className={styles.assets}>~%</span>
          </p> : null
        }

        {portfolioCount || currentBorrows?.length ? <Tabs tabs={portfolioTabs} /> : null}

        {!isConnected && (
          <div className={styles.emptyPortfolio}>
            <p>Connect your wallets to get started</p>
            <div className={styles.imgBox}>
              <img src={walletImg} width={220} height={220} alt="" />
            </div>
            <Button style={{ width: "200px", margin: "0 auto", paddingTop: "18px" }} onClick={() => navigate('/borrows')} title={"GO TO INVEST"} />
          </div>

        )}

        {/* {isConnected && borrows && !portfolioCount && !currentBorrows &&
          <div className={styles.emptyPortfolio}>
            <p>Your portfolio is emty</p>
            <div className={styles.imgBox}>
              <img src={portfolioImg} width={220} height={220} alt="" />
            </div>
            <Button style={{ width: "200px", margin: "0 auto" }} onClick={() => navigate('/borrows')} title={"GO TO INVEST"} />
            <Button type="button" onClick={() => navigate('/borrows/addborrow')} style={{ backgroundColor: 'transparent', border: '1px solid black', color: 'black' }} title={"GET A BORROW"} />
          </div>
        } */}
      </div>


      {location.pathname === '/portfolio/investments' && (
        <>
        {borrows && portfolioCount && portfolioCount > 0 ? (
          <div className={styles.invesmentsBox}>
          {ordersList?.length ? <PortfolioList titile={"Orders"} portfolio={ordersList} /> : null}
          {upcomingList?.length ? <PortfolioList titile={"Upcoming payments"} portfolio={upcomingList} /> : null}
          {payOutList?.length ? <PortfolioList titile={"Paid out"} portfolio={payOutList} /> : null}
          {сancelledList?.length ? <PortfolioList titile={"Cancelled"} portfolio={сancelledList} /> : null}
        </div>) : (
                  <div className={styles.emptyPortfolio}>
                  <p>Your portfolio is emty</p>
                  <div className={styles.imgBox}>
                    <img src={portfolioImg} width={220} height={220} alt="" />
                  </div>
                  <Button style={{ width: "200px", margin: "0 auto" }} onClick={() => navigate('/borrows')} title={"GO TO INVEST"} />
                  <Button type="button" onClick={() => navigate('/borrows/addborrow')} style={{ backgroundColor: 'transparent', border: '1px solid black', color: 'black' }} title={"GET A BORROW"} />
                </div>
        )}
        </>
      )}
      

      {location.pathname === '/portfolio/borrows' && currentBorrows && currentBorrows.length > 0 ? (
        <BorrowsList defaultTab={0} borrows={currentBorrows} header={false} />
      ) : null}

      {isLoading && isConnected && (
        <div className={styles.emptyPortfolio}>
          <p>Portfolio is loading...</p>
          <Oval
            height={60}
            width={60}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={4}
            strokeWidthSecondary={2}
          />
        </div>
      )}


    </>

  )
};

export default Portfolio;