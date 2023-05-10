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


  const getPercents = (investAmoutn: number) => {
    return (investAmoutn / Number(ethers.utils.formatEther(currentBorrow.borrowingGoal)) * 100);
  };

  return (
    <>
      <Box title={title}>
        <div className={styles.investorItem}>

          <div className={styles.investorBox}>
            <p className={styles.investorAddress + " " + styles.tableHeadText}>Address</p>
          </div>

          <div className={styles.rightPart}>

            <div className={styles.investorPerecent}>
              <p className={styles.tableHeadText}>Share</p>
            </div>

            <div className={styles.investorAmount}>
              <p className={styles.investorAmountText + " " + styles.tableHeadText}>Invest value</p>
            </div>

            <div className={styles.investorAmount}>
              <p className={styles.investorAmountText + " " + styles.tableHeadText}>Est income</p>
            </div>
          </div>


        </div>


        {currentBorrow?.investors.filter(item => Number(item.amount) > 0).map((item, index) => (
          <div key={index} className={styles.investorItem}>
            <div className={styles.investorBox}>
              <MdAccountCircle size={22} />
              <p className={styles.investorAddress}>{address === item.investor ? 'You' : getShortAddress(item.investor)}</p>
              {address === item.investor && currentBorrow.status === 0 ? (
                  <CancelButton disabled={isLoadingCancelInvest} onClick={write} />
                ) : null}
            </div>

            <div className={styles.rightPart}>

              <div className={styles.investorPerecent}>
                <p>{getPercents(Number(ethers.utils.formatEther(item.amount)))}%</p>
              </div>

              <div className={styles.investorAmount}>
                <p className={styles.investorAmountText}>{ethers.utils.formatEther(item.amount)}</p>
                <CoinIcon />
              </div>

              <div className={styles.investorAmount}>
                <p className={styles.investorAmountText + " " + styles.rate}>+ {ethers.utils.formatEther(item.amount / 100 * currentBorrow.interestRate)}</p>
                <CoinIcon />
              </div>
            </div>

          </div>
        ))}
      </Box>
    </>
  )
};

export default Investors;