import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useState, ChangeEvent, useEffect } from 'react';
import { TBorrow } from '../../services/types';
import { getShortAmount, getYearRate } from '../../services/utils';
import Box from '../Box/Box';
import Button from '../Button/Button';
import styles from './BorrowControl.module.css';
import { contract } from '../../services/web3config';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import { ethers } from 'ethers';
import WaitModal from '../WaitModal/WaitModal';
import DoneModal from '../DoneModal/DoneModal';
import PrepareTransInfo from '../PrepareTransInfo/PreapareTransInfo';


const BorrowControl = ({ currentBorrow }: { currentBorrow: TBorrow | undefined }) => {

    const { address } = useAccount();

    const [depositValue, setDepostiValue] = useState(0);

    const [modalWithdrawIsOpen, setModaWithdrawIsOpen] = useState(false);
    const [modalDepositIsOpen, setModaDepositIsOpen] = useState(false);
    const [modalCloseIsOpen, setModaCloseIsOpen] = useState(false);

    const [modalWaitIsOpen, setModalWaitIsOpen] = useState(false);

    const [modalWithdrawDoneIsOpen, setModalWithdrawDoneIsOpen] = useState(false);
    const [modalDoneIsOpen, setModalDoneIsOpen] = useState(false);
    const [modalCloseDoneIsOpen, setModalCloseDoneIsOpen] = useState(false);

    const handleDepositInput = (e: ChangeEvent<HTMLInputElement>) => {
        setDepostiValue(Number(e.target.value))
    };


    const { config: depositMoneyConfig, error: errorDeposit, isLoading: prepareLoading } = usePrepareContractWrite({
        address: contract.address,
        abi: contract.abi,
        functionName: 'depositMoney',
        args: [currentBorrow?.borrowId],
        overrides: {
            from: address,
            value: ethers.utils.parseEther(depositValue.toString())
        }
    });

    const { data: depositData, isLoading: isLoadingDepositData, isSuccess, write: depositWrite, reset } = useContractWrite({
        ...depositMoneyConfig,
        onSuccess(data) {
            setModalWaitIsOpen(true);
        },
    });

    const { data: dataWaitDeposit, isError: errorWaitInvest, isLoading: loadingWaitDeposit } = useWaitForTransaction({
        hash: depositData?.hash,
        onSuccess(data) {
            setModaDepositIsOpen(false);
            setModalWaitIsOpen(false);
            setModalDoneIsOpen(true);
        },
    })




    const { config: closeBorrowConfig, error: errorCloseBorrow, isLoading: prepareLoadingCloseBorrow } = usePrepareContractWrite({
        address: contract.address,
        abi: contract.abi,
        functionName: 'closeBorrow',
        args: [currentBorrow?.borrowId],
    });

    const { data: closeBorrowData, isLoading: isLoadingCloseBorrow, isSuccess: isSuccessCloseBorrow, write: closeBorrowWrite, reset: closeBorrowReset } = useContractWrite({
        ...closeBorrowConfig,
        onSuccess(data) {
            setModalWaitIsOpen(true);
        },
    });

    const { data: dataWaitCloseBorrow, isError: errorWaitCloseBorrow, isLoading: loadingWaitCloseBorrow } = useWaitForTransaction({
        hash: closeBorrowData?.hash,
        onSuccess(data) {
            setModaCloseIsOpen(false);
            setModalWaitIsOpen(false);
            setModalCloseDoneIsOpen(true);
        },
    })


    const { config: withdrawBorrowConfig, error: errorWithdrawBorrow, isLoading: prepareLoadingWithdrawBorrow } = usePrepareContractWrite({
        address: contract.address,
        abi: contract.abi,
        functionName: 'withdrawMoney',
        args: [currentBorrow?.borrowId, '100'],
    });

    const { data: withdrawBorrowData, isLoading: isLoadingWithdrawBorrow, isSuccess: isSuccessWithdrawBorrow, write: withdrawBorrowWrite, reset: withdrawBorrowReset } = useContractWrite({
        ...withdrawBorrowConfig,
        onSuccess(data) {
            setModalWaitIsOpen(true);
        },
    });

    const { data: dataWaitWithdrawBorrow, isError: errorWaitWithdrawBorrow, isLoading: loadingWaitWithdrawBorrow } = useWaitForTransaction({
        hash: withdrawBorrowData?.hash,
        onSuccess(data) {
            setModaWithdrawIsOpen(false);
            setModalWaitIsOpen(false);
            setModalWithdrawDoneIsOpen(true);
        },
    })


    const modalDepositHandler = () => {
        setModaDepositIsOpen(!modalDepositIsOpen);
    };

    const modalWithdrawHandler = () => {
        setModaWithdrawIsOpen(!modalWithdrawIsOpen);
    };

    const modalCloseHandler = () => {
        setModaCloseIsOpen(!modalCloseIsOpen);
    };


    const modalWaitHandler = () => {
        setModalWaitIsOpen(!modalWaitIsOpen);
    };

    const modalDoneHandler = () => {
        setModalDoneIsOpen(!modalDoneIsOpen);
    };


    const modalCloseDoneHandler = () => {
        setModalCloseDoneIsOpen(!modalCloseDoneIsOpen);
    };

    const modalWithdrawDoneHandler = () => {
        setModalWithdrawDoneIsOpen(!modalWithdrawDoneIsOpen);
    };

    const borrowBallance = Number(currentBorrow?.borrowBalance) / 10 ** 18;
    const interestAmount = getYearRate(currentBorrow?.borrowingGoal, currentBorrow?.interestRate, currentBorrow?.borrowingPeriod);
    const allAmountsToPay = Number(currentBorrow?.borrowingGoal) / 10 ** 18 + interestAmount;
    const notEnought = allAmountsToPay - borrowBallance;


    useEffect(() => {
        console.log(allAmountsToPay)


    }, [allAmountsToPay])


    return (
        <>
            <Box title="Borrow's management">
                <div className={styles.details}>
                    <div className={styles.details_item}>
                        <p className={styles.details_text}>Borrow balance</p>
                        <p className={styles.details_amount}>{borrowBallance}</p>
                    </div>
                    <div className={styles.details_item}>
                        <p className={styles.details_text}>interest to pay</p>
                        <p className={styles.details_amount}>{interestAmount.toFixed(5)}</p>
                    </div>

                    <div className={styles.controlBurrons}>
                        <Button onClick={modalWithdrawHandler} title='Withdraw ' />
                        {currentBorrow && currentBorrow?.status <= 1 &&
                            <>
                                <Button onClick={modalDepositHandler} title='Deposit' />
                                <Button onClick={modalCloseHandler} style={{ backgroundColor: 'red' }} title='Close Borrow' />
                            </>
                        }
                    </div>
                </div>
            </Box>

            {modalWithdrawIsOpen && (
                <Modal onClose={modalWithdrawHandler} title='Withdraw from borrow'>
                    <div className={styles.modalInners}>
                        {errorWithdrawBorrow && <Box>
                            <p>Something wrong</p>
                        </Box>}
                        <Button
                            onClick={withdrawBorrowWrite}
                            isLoading={isLoadingWithdrawBorrow || loadingWaitWithdrawBorrow}
                            disabled={prepareLoadingWithdrawBorrow || isLoadingWithdrawBorrow || errorWithdrawBorrow || loadingWaitWithdrawBorrow ? true : false}
                            title={isLoadingCloseBorrow ? 'Pending...' : 'Withdraw all'}
                        />
                    </div>
                </Modal>
            )}

            {modalDepositIsOpen && (
                <Modal onClose={modalDepositHandler} title='Deposit to borrow'>
                    <div className={styles.modalInners}>
                        <p>Deposit funds with interest to pay out to investors</p>
                        <Input type='number' setValue={setDepostiValue} onChange={handleDepositInput} value={depositValue} placeholder={"0"} min={0.001} fastBtn />
                        <Button
                            onClick={depositWrite}
                            isLoading={isLoadingDepositData || loadingWaitDeposit}
                            disabled={prepareLoading || isLoadingDepositData || errorDeposit || loadingWaitDeposit ? true : false}
                            title='Deposit'
                        />
                        <PrepareTransInfo
                            values={[
                                {
                                    text: "Debt",
                                    amount: allAmountsToPay
                                },
                                {
                                    text: "Borrow balance",
                                    amount: borrowBallance
                                },
                                {
                                    text: "Not enough",
                                    amount: notEnought.toFixed(5)
                                },
                                {
                                    text: "Min deposit",
                                    amount: 0.001
                                }

                            ]}
                        />
                    </div>
                </Modal>
            )}

            {modalWaitIsOpen && <WaitModal modalWaitHandler={modalWaitHandler} text={"Wait for confirmations..."} />}
            {modalDoneIsOpen && <DoneModal modalDoneHandler={modalDoneHandler} text={"You have successfully deposited"} hash={depositData?.hash} />}
            {modalCloseDoneIsOpen && <DoneModal modalDoneHandler={modalCloseDoneHandler} text={"You have successfully closed the borrow"} hash={closeBorrowData?.hash} />}
            {modalWithdrawDoneIsOpen && <DoneModal modalDoneHandler={modalWithdrawDoneHandler} text={"You have successfully withdrawn funds from the borrow"} hash={withdrawBorrowData?.hash} />}

            {modalCloseIsOpen && (
                <Modal onClose={modalCloseHandler} title='Are you sure?'>
                    <div className={styles.modalInners}>
                        {errorCloseBorrow && <Box>
                            <p>Something wrong</p>
                        </Box>}
                        <Button
                            onClick={closeBorrowWrite}
                            isLoading={isLoadingCloseBorrow || loadingWaitCloseBorrow}
                            disabled={prepareLoadingCloseBorrow || isLoadingCloseBorrow || errorCloseBorrow || loadingWaitDeposit ? true : false}
                            title={isLoadingCloseBorrow ? 'Pending...' : 'Close'}
                        />
                    </div>
                </Modal>
            )}


        </>

    )
};

export default BorrowControl;




