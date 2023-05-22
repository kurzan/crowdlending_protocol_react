import Button from '../Button/Button';
import { FC, useEffect, useState, useCallback } from 'react';
import { usePrepareContractWrite, useContractWrite, useAccount, useWaitForTransaction, useBalance } from 'wagmi';
import { contract } from "../../services/web3config";
import { BigNumberish, ethers } from "ethers";
import styles from "./InvestField.module.css";
import Box from '../Box/Box';
import { TBorrow } from '../../services/types';
//@ts-ignore
import { Store } from 'react-notifications-component';
import { Oval } from 'react-loader-spinner';
import Modal from '../Modal/Modal';
import { useInputAmount } from '../../hooks/useData';
import PrepareTransInfo from '../PrepareTransInfo/PreapareTransInfo';

type TInvestFieldProps = {
  id: any;
  currentBorrow?: TBorrow;
  button: any;
  error: any;
};


const InvestField: FC<TInvestFieldProps> = ({ error, id, currentBorrow, button }) => {

  const { address, isConnected } = useAccount();
  const { inputValue, setInputValue } = useInputAmount();

  const { data: investorBalance, isError, isLoading } = useBalance({
    address: address,
  })

  const maxInvestValue = useCallback(() => {
    const maxInContract = Number(currentBorrow?.borrowingGoal) - Number(currentBorrow?.totalBorrowed);
    if (investorBalance && Number(investorBalance.value) <= maxInContract) {
      return Number(investorBalance.value)
    }

    return maxInContract;
  }, [investorBalance, currentBorrow?.borrowingGoal, currentBorrow?.totalBorrowed])

  const inputHandler = (userAmount: number) => {
    setInputValue(userAmount);
  };


  const prerapeTransInfoValues = [
    {
      text: "You balance",
      amount: `${ethers.utils.formatEther(investorBalance?.value as BigNumberish)} tBNB`      
    },
    {
      text: "Minimum",
      amount: "0,01 tBNB"
    },
    {
      text: "Maximum",
      amount: `${Number(ethers.utils.formatEther(maxInvestValue().toString())).toFixed(3)} tBNB`
    },
    {
      text: "Fee",
      amount: "0%"
    },
    {
      text: "Gas cost",
      amount: "-"
    },
  ]


  return (
    <form action="" className={styles.form}>
      <div className={styles.input_box}>
        <input onChange={e => inputHandler(Number(e.target.value))} value={inputValue} id="bet" className={styles.input} type="number" placeholder="0.01" min="0.01" step="0.01" />
        <button onClick={() => setInputValue(Number(ethers.utils.formatEther(maxInvestValue().toString())))} className={styles.max} type='button'>MAX</button>
      </div>
      {isConnected && button}
      {error && <p className={styles.warning}>something  wrong</p>}

      <PrepareTransInfo values={prerapeTransInfoValues}/>

    </form>
  )
};

export default InvestField;