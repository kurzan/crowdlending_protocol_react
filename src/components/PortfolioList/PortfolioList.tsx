import { useState, FC, SyntheticEvent } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import styles from './PortfolioList.module.css';
import CompanyLogo from '../CompanyLogo/CompanyLogo';
import Status from '../Status/Status';
import { useNavigate } from 'react-router-dom';
import { contract } from '../../services/web3config';
import CancelButton from '../CancelButton/CancelButton';
import { TPortfolio } from '../../pages/portfolio/Portfolio';

type TPortfolioListProps = {
 portfolio: TPortfolio[] | undefined;
}

const PortfolioList: FC<TPortfolioListProps> = ({portfolio}) => {

    const [choosenBorrow, setChoosenBorrow] = useState<undefined | number>(undefined);

    const { config, error, isLoading } = usePrepareContractWrite({
        address: contract.address,
        abi: contract.abi,
        functionName: 'cancelInvest',
        args: [choosenBorrow],
    });

    const { data: investData, isLoading: isLoadingCancelInvest, isSuccess, write, reset, status } = useContractWrite(config);

    const navigate = useNavigate();

    return (
        <>  
            <p className={styles.headingText}>Portfolio</p>
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
                {portfolio && portfolio?.map((portfolio, index) => (
                    <div key={index} className={styles.portfolioItem} onClick={() => navigate(`/borrows/${Number(portfolio.borrowId)}`)}>

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
                            <p className={styles.tableText + " " + styles.rate}>+ {(Number(portfolio.amount) / 10 ** 18 / 100 * Number(portfolio.interestRate)).toFixed(5)}</p>
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

                            {portfolio.status === 0 &&  <CancelButton data={investData} disabled={isLoadingCancelInvest && choosenBorrow === portfolio.borrowId} onClick={(e: SyntheticEvent) => {
                                e.stopPropagation();
                                setChoosenBorrow(portfolio.borrowId);
                                write?.()
                            }}/>}


                        </div>
                    </div>
                ))}
            </div>
        </>

    )
};

export default PortfolioList;
