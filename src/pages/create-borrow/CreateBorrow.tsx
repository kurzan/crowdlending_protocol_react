import { useEffect, useState } from "react";
import styles from './CreateBorrow.module.css';
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useForm } from "../../hooks/useForms";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { contract } from "../../services/web3config";
import { ethers } from "ethers";
import { useData } from "../../hooks/useData";
import Box from "../../components/Box/Box";
import WaitModal from "../../components/WaitModal/WaitModal";
import DoneModal from "../../components/DoneModal/DoneModal";
import { useTranslation } from "react-i18next";

type TInitialState = {
    borrowingGoal: number,
    borrowingPeriod: number,
    interestRate: number
};

function CreateBorrow() {

    const { t } = useTranslation();

    const [verifiedBorrower, serVerifiedBorrower] = useState(true);
    const [alreadyBorrower, setAlreadyBorrower] = useState(false);
    const { borrowers, borrows } = useData();
    const { values, handleChange, setValues } = useForm({} as TInitialState);
    const { address, isConnected } = useAccount();


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
        <>
            <div className={styles.container}>
                {alreadyBorrower && <p className={styles.heading}>{t("Already you have Opened borrow")} 👷🏽 </p>}
                {!alreadyBorrower && <>
                    <p className={styles.heading}>{t("Interact with a smart contract and create a borrow")} 👷🏽 </p>

                    <form action="" className={styles.form}>

                        <Input label={t("Borrowing goal") + ", SIBR"} placeholder={"1 SIBR"} name="borrowingGoal" value={values.borrowingGoal || ''} onChange={handleChange} type="number" />
                        <Input label={t("Period, days")} placeholder={"30"} name="borrowingPeriod" value={values.borrowingPeriod || ''} onChange={handleChange} type="number" />
                        <Input label={t("Interest rate") + ", %"} placeholder={"15"} name="interestRate" value={values.interestRate || ''} onChange={handleChange} type="number" />

                        <Button onClick={write} isLoading={isLoadingInvestData || loadingWaitInvest} disabled={prepareLoading || isLoadingInvestData || error || loadingWaitInvest ? true : false} title={!isLoadingInvestData ? t("Create borrow") : t("Pending")} />
                    </form>

                    {!verifiedBorrower ? (
                        <Box bg="#FFF3E0">
                            <p>⚠ {t("You are not verified borrower")} ⚠</p><br />
                            <p>{t("However")}</p><br />
                            <p>{t("to be verified")} <a href="https://t.me/mkurzov" rel="noreferrer" target="_blank">https://t.me/mkurzov</a></p><br />
                        </Box>
                    ) : null}
                </>}

            </div>

            {modalWaitIsOpen && <WaitModal modalWaitHandler={modalWaitHandler} text={"Wait for confirmations..."}/>}
            {modalDoneIsOpen && <DoneModal modalDoneHandler={modalDoneHandler} heading="Congratulations" text="You successfuly create borrow" hash={investData?.hash}/>}

        </>
    );
}

export default CreateBorrow;