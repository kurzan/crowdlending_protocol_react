import { useEffect } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { TBorrow } from "../../services/types";
import Box from "../Box/Box";
import CoinIcon from "../CoinIcon/CoinIcon";
import styles from "./Investors.module.css";
import { contract } from "../../services/web3config";
import { ethers } from "ethers";
import { Oval } from 'react-loader-spinner';

const Investors = ({ currentBorrow, title }: { currentBorrow: TBorrow, title: string }) => {

    const { address } = useAccount();

    const { config, error, isLoading } = usePrepareContractWrite({
        address: contract.address,
        abi: contract.abi,
        functionName: 'cancelInvest',
        args: [currentBorrow.borrowId],
    });

    const { data: investData, isLoading: isLoadingCancelInvest, isSuccess, write, reset, status } = useContractWrite(config);


    return (
        <>
            <Box title={title}>
                {currentBorrow?.investors.filter(item => Number(item.amount) > 0).map((item, index) => (
                    <div key={index} className={styles.investorItem}>
                        <p className={styles.investorAddress}>{address === item.investor ? 'You' : item.investor}</p>
                        <div className={styles.investorAmount}>
                            {address === item.investor && currentBorrow.status === 0 ? (
                                <button disabled={isLoadingCancelInvest} className={styles.button} onClick={write}>
                                    {isLoadingCancelInvest ? <Oval
                                        height={20}
                                        width={20}
                                        color="#4fa94d"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="#4fa94d"
                                        strokeWidth={4}
                                        strokeWidthSecondary={2}
                                    /> :
                                    <p className={styles.buttonText}>Cancel</p>}
                                </button>
                            ) : null}
                            <p className={styles.investorAmountText}>{Number(item.amount) / 10 ** 18}</p>
                            <CoinIcon />
                        </div>

                    </div>
                ))}
            </Box>
        </>
    )
};

export default Investors;