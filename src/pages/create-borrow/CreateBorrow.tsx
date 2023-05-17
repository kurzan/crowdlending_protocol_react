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

type TInitialState = {
    borrowingGoal: string,
    borrowingPeriod: string,
    interestRate: string
};



function CreateBorrow() {
    const [verifiedBorrower, serVerifiedBorrower] = useState(true);
    const { borrowers } = useData();
    const { values, handleChange, setValues } = useForm({} as TInitialState);
    const { address, isConnected } = useAccount();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalWaitIsOpen, setModalWaitIsOpen] = useState(false);
    const [modalDoneIsOpen, setModalDoneIsOpen] = useState(false);

    useEffect(() => {

        if(borrowers && borrowers.find(borrow => borrow.borrower === address)) {
            serVerifiedBorrower(true)
        } else {
            serVerifiedBorrower(false)
        }


    }, [address, borrowers])

    const { config, error, isLoading: prepareLoading } = usePrepareContractWrite({
        address: contract.address,
        abi: contract.abi,
        functionName: 'createBorrow',
        args: [Number(values.borrowingGoal) * 10 ** 10, values.borrowingPeriod, values.interestRate],
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
        console.log(borrowers)
    }, [borrowers])

    useEffect(() => {
        console.log(values)
    }, [values])

    return (
        <LayoutPage>
            <div className={styles.container}>
                <p className={styles.heading}>Interact with a smart contract and create a borrow 👷🏽 </p>
                <form className={styles.form} onSubmit={write}>

                    <Input label="Borrowing goal" placeholder={"min 0.1, max 1 tBNB"} name="borrowingGoal" value={values.borrowingGoal || ''} onChange={handleChange} type="number" min={0.1} max={1} />
                    <Input label="Period, days" placeholder={"min 7 days, max 90 days"} name="borrowingPeriod" value={values.borrowingPeriod || ''} onChange={handleChange} type="number" min={7} max={90} />
                    <Input label="Interest rate" placeholder={"for ex. 9-15%"} name="interestRate" value={values.interestRate || ''} onChange={handleChange} type="number" />

                    <Button submit={"submit"} isLoading={isLoadingInvestData || loadingWaitInvest} disabled={prepareLoading || isLoadingInvestData || error || loadingWaitInvest ? true : false} title={!isLoadingInvestData ? "Create borrow" : "Pending..."} />
                </form>

                {!verifiedBorrower ? (
                    <Box bg="#FFF3E0">
                        <p>⚠ You are not verified borrower ⚠</p><br/>
                        <p>However, you can still create a loan, but note that it will be marked as unverified and high risk.</p><br/>
                        <p>If you would like to be verified as a borrower on our platform, please contact us <a href="https://t.me/mkurzov" rel="noreferrer"  target="_blank">https://t.me/mkurzov</a></p><br/>
                    </Box>
                ) : null}
            </div>

        </LayoutPage>
    );
}

export default CreateBorrow;