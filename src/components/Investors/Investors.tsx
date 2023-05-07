import { useEffect } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { TBorrow } from "../../services/types";
import Box from "../Box/Box";
import CoinIcon from "../CoinIcon/CoinIcon";
import styles from "./Investors.module.css";
import { contract } from "../../services/web3config";
import { ethers } from "ethers";
import { Oval } from 'react-loader-spinner';
import CancelButton from '../CancelButton/CancelButton';
import { MdAccountCircle } from 'react-icons/md';
import { getShortAddress } from '../../services/utils';

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
                        <div className={styles.investorBox}>
                          <MdAccountCircle/>
                          <p className={styles.investorAddress}>{address === item.investor ? 'You' : getShortAddress(item.investor)}</p>
                        </div>
                        <div className={styles.investorAmount}>
                            {address === item.investor && currentBorrow.status === 0 ? (
                                <CancelButton disabled={isLoadingCancelInvest} onClick={write}/>
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