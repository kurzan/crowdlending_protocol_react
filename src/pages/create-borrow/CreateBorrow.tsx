import { SyntheticEvent, useEffect, useState } from "react";
import LayoutPage from "../layout/Layout";
import styles from './CreateBorrow.module.css';
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useForm } from "../../hooks/useForms";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { contract } from "../../services/web3config";
import { ethers } from "ethers";
import { useData } from "../../hooks/useData";
import Box from "../../components/Box/Box";
import { Oval } from "react-loader-spinner";
import doneImg from '../../images/done.svg';
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

type TInitialState = {
    borrowingGoal: number,
    borrowingPeriod: number,
    interestRate: number
};



function CreateBorrow() {
    const [verifiedBorrower, serVerifiedBorrower] = useState(true);
    const { borrowers } = useData();
    const { values, handleChange, setValues } = useForm({} as TInitialState);
    const { address, isConnected } = useAccount();
    const navigate = useNavigate();

    const [modalWaitIsOpen, setModalWaitIsOpen] = useState(false);
    const [modalDoneIsOpen, setModalDoneIsOpen] = useState(false);

    useEffect(() => {

        if(borrowers && borrowers.find(borrow => borrow.borrower === address)) {
            serVerifiedBorrower(true)
        } else {
            serVerifiedBorrower(false)
        }
    }, [address, borrowers])

    const goal = values.borrowingGoal ? values.borrowingGoal : 0;

    const { config, error, isLoading: prepareLoading } = usePrepareContractWrite({
        address: contract.address,
        abi: contract.abi,
        functionName: 'createBorrow',
        args: [ethers.utils.parseEther(goal.toString()), values.borrowingPeriod, values.interestRate],
    });

    const { data: investData, isLoading: isLoadingInvestData, isSuccess, write, reset } = useContractWrite({
        ...config,
        onSuccess(data) {
            setModalWaitIsOpen(true);
        },
    });

    const { data: dataWaitInvest, isError: errorWaitInvest, isLoading: loadingWaitInvest } = useWaitForTransaction({
        hash: investData?.hash,
        onSuccess(data) {
            setModalWaitIsOpen(false);
            setModalDoneIsOpen(true);
            setTimeout(() => navigate(`/borrows/`), 5000);
        },
    })

    useEffect(() => {
        console.log(values)
    }, [values])

    const modalWaitHandler = () => {
      setModalWaitIsOpen(!modalWaitIsOpen);
    };
  
    const modalDoneHandler = () => {
      setModalDoneIsOpen(!modalDoneIsOpen);
    };

    return (
        <LayoutPage>
            <div className={styles.container}>
                <p className={styles.heading}>Interact with a smart contract and create a borrow 👷🏽 </p>
                <form action="" className={styles.form}>

                    <Input label="Borrowing goal, tBNB" placeholder={"for ex. 1 tBNB"} name="borrowingGoal" value={values.borrowingGoal || ''} onChange={handleChange} type="number" />
                    <Input label="Period, days" placeholder={"for ex. 5-30 days"} name="borrowingPeriod" value={values.borrowingPeriod || ''} onChange={handleChange} type="number" />
                    <Input label="Interest rate, APR" placeholder={"for ex. 9-15%"} name="interestRate" value={values.interestRate || ''} onChange={handleChange} type="number" />

                    <Button onClick={write} isLoading={isLoadingInvestData || loadingWaitInvest} disabled={prepareLoading || isLoadingInvestData || error || loadingWaitInvest ? true : false} title={!isLoadingInvestData ? "Create borrow" : "Pending..."} />
                </form>

                {!verifiedBorrower ? (
                    <Box bg="#FFF3E0">
                        <p>⚠ You are not verified borrower ⚠</p><br/>
                        <p>However, you can still create a loan, but note that it will be marked as unverified and high risk.</p><br/>
                        <p>If you would like to be verified as a borrower on our platform, please contact us <a href="https://t.me/mkurzov" rel="noreferrer"  target="_blank">https://t.me/mkurzov</a></p><br/>
                    </Box>
                ) : null}
            </div>

            {modalWaitIsOpen && (
          <Modal onClose={modalWaitHandler}>
            <div className={styles.waitContainer}>
            <p>Wait for confirmations...</p>
            <Oval
              height={60}
              width={60}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={4}
              strokeWidthSecondary={2}
            />
            </div>
          </Modal>
        )}


        {modalDoneIsOpen && (
          <Modal onClose={modalDoneHandler}>
            <div className={styles.waitContainer}>
              <p className={styles.modalHeading}>Congratulations</p>
              <img src={doneImg} alt="done" />
              <p className={styles.modalSubHeading}>You successfuly create borrow</p>
              <a href={`https://testnet.bscscan.com/tx/${investData?.hash}`} target="_blanc">View transaction</a>
            </div>
          </Modal>
        )}  

        </LayoutPage>
    );
}

export default CreateBorrow;