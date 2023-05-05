import { useState, useEffect, useCallback } from 'react';
import { useData } from "../../hooks/useData";
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import styles from './PortfolioList.module.css';
import { TBorrow } from '../../services/types';
import CompanyLogo from '../CompanyLogo/CompanyLogo';
import Status from '../Status/Status';
import { useNavigate } from 'react-router-dom';
import { contract } from '../../services/web3config';
import CancelButton from '../CancelButton/CancelButton';

type TPortfolio = Partial<TBorrow> & { amount: number }

const PortfolioList = () => {

    const { borrows } = useData();
    const { address } = useAccount();

    const [choosenBorrow, setChoosenBorrow] = useState<undefined | number>(undefined);

    const { config, error, isLoading } = usePrepareContractWrite({
        address: contract.address,
        abi: contract.abi,
        functionName: 'cancelInvest',
        args: [choosenBorrow],
    });

    const { data: investData, isLoading: isLoadingCancelInvest, isSuccess, write, reset, status } = useContractWrite(config);

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


    useEffect(() => {
        console.log(portfolio)
    }, [portfolio])

    return (
        <>  
            <p className={styles.headingText}>Your invesment</p>
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
                        <p className={styles.tableHeadText}>Rate</p>
                    </div>

                    <div className={styles.tableCell}>
                        <p className={styles.tableHeadText}>Period</p>
                    </div>

                    <div className={styles.tableCell}>
                        <p className={styles.tableHeadText}>Status</p>
                    </div>
                </div>
                {portfolio && portfolio?.map(portfolio => (
                    <div  className={styles.portfolioItem}>

                        <div className={styles.tableCell}>
                            <CompanyLogo src={portfolio.image} alt={portfolio.companyName} />
                            <div className={styles.company}>
                                <p className={styles.desc}>{portfolio.description}</p>
                                <p className={styles.name}>{portfolio.companyName}</p>
                            </div>
                        </div>

                        <div className={styles.tableCell}>
                            <p className={styles.tableText}>{Number(portfolio.borrowId)}</p>
                        </div>

                        <div className={styles.tableCell}>
                            <p className={styles.tableText}>{Number(portfolio.amount) / 10 ** 18}</p>
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
                        <div className={styles.tableCell}>
                            <CancelButton disabled={false} onClick={() => {
                                setChoosenBorrow(portfolio.borrowId);
                                write?.()
                            }}/>
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
};

export default PortfolioList;
