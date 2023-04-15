import Button from '../Button/Button';
import { FC, useEffect, useState } from 'react';
import { usePrepareContractWrite, useContractWrite, useAccount, useConnect} from 'wagmi';
import { contract } from "../../services/web3config";
import { ethers } from "ethers";
import styles from "./InvestField.module.css";
import Box from '../Box/Box';
import { TBorrow } from '../../services/types';
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

  const maxInvestValue = Number(currentBorrow?.borrowingGoal) - Number(currentBorrow?.totalBorrowed);

  useEffect(() => {
    if (!isSuccess) return;

    Store.addNotification({
      title: "Поздравляем!",
      message: `Транзакция успешно отправлена`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  }, [isSuccess])

  return (
    <form action="" className={styles.form}>
      <input onChange={e => inputHandler(Number(e.target.value))}  id="bet" className={styles.input} type="number" placeholder="0.01" min="0.01" step="0.01"  />
      {isConnected && <Button onClick={() => write?.()} disabled={prepareLoading || error ? true : false} title={"Инвестировать"} />}
      {error ? (
        <Box margin="0" >
          <p>An error occurred preparing the transaction</p>
        </Box>
      ) : (
        <Box margin="0">
          <p>Мин. сумма 0,01 tBNB, макс. {Number(ethers.utils.formatEther(maxInvestValue.toString()))} tBNB</p>
        </Box>
      )
    }
    </form>
  )
};

export default InvestField;