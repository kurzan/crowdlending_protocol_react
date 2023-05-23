import { useState, FC, SyntheticEvent } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import styles from './PortfolioList.module.css';
import CompanyLogo from '../CompanyLogo/CompanyLogo';
import Status from '../Status/Status';
import { useNavigate } from 'react-router-dom';
import { contract } from '../../services/web3config';
import CancelButton from '../CancelButton/CancelButton';
import { TPortfolio } from '../../pages/portfolio/Portfolio';
import { getShortAddress, getShortAmount, getYearRate } from '../../services/utils';
import { useBorrowDates } from '../../hooks/useBorrowDates';

type TPortfolioListProps = {
 portfolio: TPortfolio[] | undefined;
}

const PortfolioList: FC<TPortfolioListProps> = ({portfolio}) => {

    return (
        <>  
            <p className={styles.headingText}>Investments</p>
            <div className={styles.container}>
                <div className={styles.headTable}>
                    <div className={styles.tableCell}>
                        <p className={styles.tableHeadText}>Company</p>
                    </div>

                    <div className={styles.tableCell}>
                        <p className={styles.tableHeadText}>#</p>
                    </div>

                    <div className={styles.tableCell}>
                        <p className={styles.tableHeadText}>Amount</p>
                    </div>

                    <div className={styles.tableCell}>
                        <p className={styles.tableHeadText}>Est income</p>
                    </div>


                    <div className={styles.tableCell}>
                        <p className={styles.tableHeadText}>Rate</p>
                    </div>

                    <div className={styles.tableCell}>
                        <p className={styles.tableHeadText}>Period</p>
                    </div>

                    <div className={styles.tableCell}>
                        <p className={styles.tableHeadText}>Status</p>
                    </div>
                    <div className={styles.tableCell + " " + styles.cancel}>
                        
                    </div>
                </div>
                
                {portfolio && portfolio?.slice().sort((a, b) => {
                    //@ts-ignore
                    return a.status -  b.status
                    }).map((portfolio, index) => <PortfolioInvestItem portfolio={portfolio}/>)}
                
            </div>
        </>

    )
};

export default PortfolioList;


type TPortfolioInvestItemProps = {
    portfolio: TPortfolio;
};

const PortfolioInvestItem: FC<TPortfolioInvestItemProps> = ({portfolio}) => {
    const navigate = useNavigate();

    const { config, error, isLoading } = usePrepareContractWrite({
        address: contract.address,
        abi: contract.abi,
        functionName: 'cancelInvest',
        args: [portfolio?.borrowId],
    });

    const { data: investData, isLoading: isLoadingCancelInvest, isSuccess, write, reset, status } = useContractWrite(config);


    return(
        (
            <div className={styles.portfolioItem} onClick={() => navigate(`/borrows/${Number(portfolio.borrowId)}`)}>

                <div className={styles.tableCell}>
                    <CompanyLogo src={portfolio.image} alt={portfolio.companyName} />
                    <div className={styles.company}>
                        <p className={styles.desc}>{portfolio.description ? portfolio.description : "Unverified"}</p>
                        <p className={styles.name}>{portfolio.companyName ? portfolio.companyName : getShortAddress(portfolio.borrower)}</p>
                    </div>
                </div>

                <div className={styles.tableCell}>
                    <p className={styles.tableText}>{Number(portfolio.borrowId)}</p>
                </div>

                <div className={styles.tableCell}>
                    <p className={styles.tableText}>{getShortAmount(Number(portfolio.amount) / 10 ** 18)}</p>
                </div>

                <div className={styles.tableCell}>
                    <p className={styles.tableText + " " + styles.rate}>+ {getYearRate(portfolio.amount, portfolio.interestRate, portfolio.borrowingPeriod).toFixed(8)}</p>
                </div>

                <div className={styles.tableCell}>
                    <p className={styles.tableText + " " + styles.rate}>{Number(portfolio.interestRate)}%</p>
                </div>

                <div className={styles.tableCell}>
                    <p className={styles.tableText}>{Number(portfolio.borrowingPeriod) / 86400}d</p>
                </div>

                <div className={styles.tableCell}>
                    <Status status={portfolio.status} />
                </div>
                <div className={styles.tableCell + " " + styles.cancel}>

                    {portfolio.status === 0 &&  <CancelButton data={investData} disabled={isLoadingCancelInvest} onClick={(e: SyntheticEvent) => {
                        e.stopPropagation();
                        write?.();
                    }}/>}

                    {portfolio.status === 1 && (
                        <p></p>
                    )}

                </div>
            </div>
        )
    )
};