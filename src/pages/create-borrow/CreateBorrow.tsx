import { SyntheticEvent, useEffect, useState } from "react";
import LayoutPage from "../layout/Layout";
import styles from './CreateBorrow.module.css';
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useForm } from "../../hooks/useForms";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { contract } from "../../services/web3config";
import { ethers } from "ethers";

const initialState = {
  borrowingGoal: '0',
  borrowingPeriod: '0',
  interestRate: '0'
}

function CreateBorrow() {

  const { values, handleChange, setValues } = useForm<any>(initialState);
  const { address, isConnected } = useAccount();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalWaitIsOpen, setModalWaitIsOpen] = useState(false);
  const [modalDoneIsOpen, setModalDoneIsOpen] = useState(false);

  const { config, error, isLoading: prepareLoading } = usePrepareContractWrite({
    address: contract.address,
    abi: contract.abi,
    functionName: 'createBorrow',
    args: [ethers.utils.parseEther(values.borrowingGoal).toString(), values.borrowingPeriod, values.interestRate],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(values.borrowingGoal.toString())
    }
  });

  const { data: investData, isLoading: isLoadingInvestData, isSuccess, write, reset } = useContractWrite({
    ...config,
    onSuccess(data) {
      setModalIsOpen(false);
      setModalWaitIsOpen(true);
    },
  });

  const { data: dataWaitInvest, isError: errorWaitInvest, isLoading: loadingWaitInvest } = useWaitForTransaction({
    hash: investData?.hash,
    onSuccess(data) {
      setModalWaitIsOpen(false);
      setModalDoneIsOpen(true);
    },
  })


  useEffect(() => {
    console.log(values)
  }, [values])

  return (
    <LayoutPage>
      <p className={styles.heading}>Interact with a smart contract and create a borrow</p>
      <form className={styles.form} onSubmit={() => { }}>

        <Input label="Borrowing goal" placeholder={"min 0.1, max 1 tBNB"} name="borrowingGoal" value={values.borrowingGoal || ''} onChange={handleChange} type="number" min="0.1" max='1' />
        <Input label="Period, days" placeholder={"min 7 days, max 90 days"} name="borrowingPeriod" value={values.borrowingPeriod || ''} onChange={handleChange} type="number" min="7" max='90'/>
        <Input label="Interest rate" placeholder={"for ex. 9-15%"} name="interestRate" value={values.interestRate || ''} onChange={handleChange} type="number" />

        <Button submit={"submit"} title="Create borrow" />
      </form>
    </LayoutPage>
  );
}

export default CreateBorrow;