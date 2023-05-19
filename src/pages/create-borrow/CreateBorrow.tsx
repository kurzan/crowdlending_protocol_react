import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import WaitModal from "../../components/WaitModal/WaitModal";
import DoneModal from "../../components/DoneModal/DoneModal";

type TInitialState = {
    borrowingGoal: number,
    borrowingPeriod: number,
    interestRate: number
};



function CreateBorrow() {
    const [verifiedBorrower, serVerifiedBorrower] = useState(true);
    const [alreadyBorrower, setAlreadyBorrower] = useState(false);
    const { borrowers, borrows } = useData();
    const { values, handleChange, setValues } = useForm({} as TInitialState);
    const { address, isConnected } = useAccount();

    const navigate = useNavigate();

    const [modalWaitIsOpen, setModalWaitIsOpen] = useState(false);
    const [modalDoneIsOpen, setModalDoneIsOpen] = useState(false);

    useEffect(() => {

        if (borrowers && borrowers.find(borrow => borrow.borrower === address)) {
            serVerifiedBorrower(true)
        } else {
            serVerifiedBorrower(false)
        }
    }, [address, borrowers])


    useEffect(() => {
        borrows?.map(borrow => {
            if (borrow.borrower === address && borrow.status === 0) {
                setAlreadyBorrower(true);
            }
        })
    }, [address, borrows])

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
            // setTimeout(() => navigate(`/borrows/`), 5000);
        },
    })

    const modalWaitHandler = () => {
        setModalWaitIsOpen(!modalWaitIsOpen);
    };

    const modalDoneHandler = () => {
        setModalDoneIsOpen(!modalDoneIsOpen);
    };

    return (
        <LayoutPage>
            <div className={styles.container}>
                {alreadyBorrower && <p className={styles.heading}>Already you have Opened borrow 👷🏽 </p>}
                {!alreadyBorrower && <>
                    <p className={styles.heading}>Interact with a smart contract and create a borrow 👷🏽 </p>

                    <form action="" className={styles.form}>

                        <Input label="Borrowing goal, tBNB" placeholder={"for ex. 1 tBNB"} name="borrowingGoal" value={values.borrowingGoal || ''} onChange={handleChange} type="number" />
                        <Input label="Period, days" placeholder={"for ex. 5-30 days"} name="borrowingPeriod" value={values.borrowingPeriod || ''} onChange={handleChange} type="number" />
                        <Input label="Interest rate, APR" placeholder={"for ex. 9-15%"} name="interestRate" value={values.interestRate || ''} onChange={handleChange} type="number" />

                        <Button onClick={write} isLoading={isLoadingInvestData || loadingWaitInvest} disabled={prepareLoading || isLoadingInvestData || error || loadingWaitInvest ? true : false} title={!isLoadingInvestData ? "Create borrow" : "Pending..."} />
                    </form>

                    {!verifiedBorrower ? (
                        <Box bg="#FFF3E0">
                            <p>⚠ You are not verified borrower ⚠</p><br />
                            <p>However, you can still create a loan, but note that it will be marked as unverified and high risk.</p><br />
                            <p>If you would like to be verified as a borrower on our platform, please contact us <a href="https://t.me/mkurzov" rel="noreferrer" target="_blank">https://t.me/mkurzov</a></p><br />
                        </Box>
                    ) : null}
                </>}

            </div>

            {modalWaitIsOpen && <WaitModal modalWaitHandler={modalWaitHandler} text={"Wait for confirmations..."}/>}
            {modalDoneIsOpen && <DoneModal modalDoneHandler={modalDoneHandler} heading="Congratulations" text="You successfuly create borrow" hash={investData?.hash}/>}

        </LayoutPage>
    );
}

export default CreateBorrow;