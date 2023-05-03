import Button from '../Button/Button';
import { FC, useEffect, useState } from 'react';
import { usePrepareContractWrite, useContractWrite, useAccount, useWaitForTransaction} from 'wagmi';
import { contract } from "../../services/web3config";
import { ethers } from "ethers";
import styles from "./InvestField.module.css";
import Box from '../Box/Box';
import { TBorrow } from '../../services/types';
//@ts-ignore
import { Store } from 'react-notifications-component';

type TInvestFieldProps = {
  id: any;
  currentBorrow?: TBorrow;
};


const InvestField: FC<TInvestFieldProps> = ({id, currentBorrow}) => {

  const { address, isConnected } = useAccount();
  const [inputValue, setInputValue] = useState(0.01);

  const inputHandler = (userBet: number) => {
    setInputValue(userBet);
  };

  const { config, error, isLoading: prepareLoading } = usePrepareContractWrite({
    address: contract.address,
    abi: contract.abi,
    functionName: 'invest',
    args: [id],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(inputValue.toString())
    }
  });

  const { data: investData, isLoading: isLoadingInvestData, isSuccess, write, reset } = useContractWrite(config);

  const { data: dataWaitInvest, isError: errorWaitInvest, isLoading: loadingWaitInvest } = useWaitForTransaction({
    hash: investData?.hash,
  })

  const maxInvestValue = Number(currentBorrow?.borrowingGoal) - Number(currentBorrow?.totalBorrowed);

  useEffect(() => {
    if (!dataWaitInvest) return;

    Store.addNotification({
      title: "Success!",
      message: `You successfully invested ${inputValue} in ${currentBorrow?.companyName}`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 10000,
        onScreen: true
      }
    });
    
  }, [dataWaitInvest])



  return (
    <form action="" className={styles.form}>
      <div className={styles.input_box}>
        <input onChange={e => inputHandler(Number(e.target.value))} value={inputValue} id="bet" className={styles.input} type="number" placeholder="0.01" min="0.01" step="0.01"  />
        <button onClick={() => setInputValue(Number(ethers.utils.formatEther(maxInvestValue.toString())))} className={styles.max} type='button'>MAX</button>
      </div>
      {isConnected && <Button onClick={write} isLoading={isLoadingInvestData || loadingWaitInvest} disabled={prepareLoading || isLoadingInvestData || error || loadingWaitInvest ? true : false} title={!isLoadingInvestData ? "Invest" : "Pending..."} />}
        <Box margin="0" bg={"rgb(249, 249, 249)"} >
          {error ? <p>An error occurred preparing the transaction</p>
           : 
          (
            <>
              <div className={styles.trans_info}>
                <p className={styles.trans_text}>Minimum</p>
                <p className={styles.trans_amount}>0,01 tBNB</p>
              </div>

              <div className={styles.trans_info}>
                <p className={styles.trans_text}>Maximum</p>
                <p className={styles.trans_amount}>{Number(ethers.utils.formatEther(maxInvestValue.toString()))} tBNB</p>
              </div>

              <div className={styles.trans_info}>
                <p className={styles.trans_text}>Fee</p>
                <p className={styles.trans_amount}>0%</p>
              </div>

              <div className={styles.trans_info}>
                <p className={styles.trans_text}>Gas cost</p>
                <p className={styles.trans_amount}>-</p>
              </div>


            </>
          )
        }
        </Box>
    </form>
  )
};

export default InvestField;