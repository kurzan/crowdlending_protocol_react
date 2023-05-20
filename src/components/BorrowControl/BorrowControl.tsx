import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useState, ChangeEvent } from 'react';
import { TBorrow } from '../../services/types';
import { getYearRate } from '../../services/utils';
import Box from '../Box/Box';
import Button from '../Button/Button';
import styles from './BorrowControl.module.css';
import { contract } from '../../services/web3config';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import { ethers } from 'ethers';
import WaitModal from '../WaitModal/WaitModal';
import DoneModal from '../DoneModal/DoneModal';


const BorrowControl = ({ currentBorrow }: { currentBorrow: TBorrow | undefined }) => {

    const { address } = useAccount();

    const [depositValue, setDepostiValue] = useState(0);

    const [modalWithdrawIsOpen, setModaWithdrawIsOpen] = useState(false);
    const [modalDepositIsOpen, setModaDepositIsOpen] = useState(false);
    const [modalCloseIsOpen, setModaCloseIsOpen] = useState(false);


    const [modalWaitIsOpen, setModalWaitIsOpen] = useState(false);

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
            value: ethers.utils.parseEther(depositValue.toString()) || 0
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

    return (
        <>
            <Box title="Borrow's management">
                <div className={styles.details}>
                    <div className={styles.details_item}>
                        <p className={styles.details_text}>Borrow balance</p>
                        <p className={styles.details_amount}>{Number(currentBorrow?.borrowBalance) / 10 ** 18}</p>
                    </div>
                    <div className={styles.details_item}>
                        <p className={styles.details_text}>interest to pay</p>
                        <p className={styles.details_amount}>{getYearRate(currentBorrow?.borrowingGoal, currentBorrow?.interestRate, currentBorrow?.borrowingPeriod)}</p>
                    </div>

                    <div className={styles.controlBurrons}>
                        <Button onClick={modalWithdrawHandler} title='Withdraw ' />
                        {currentBorrow?.status !== 2 && 
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
                    <Input />
                </Modal>
            )}

            {modalDepositIsOpen && (
                <Modal onClose={modalDepositHandler} title='Deposit to borrow'>
                    <div className={styles.modalInners}>
                        <Input type='number' onChange={handleDepositInput} value={depositValue || ""} placeholder={"0"} />
                        <Button
                            onClick={depositWrite}
                            isLoading={isLoadingDepositData || loadingWaitDeposit}
                            disabled={prepareLoading || isLoadingDepositData || errorDeposit || loadingWaitDeposit ? true : false}
                            title='Deposit'
                        />
                    </div>
                </Modal>
            )}

            {modalWaitIsOpen && <WaitModal modalWaitHandler={modalWaitHandler} text={"Wait for confirmations..."} />}
            {modalDoneIsOpen && <DoneModal modalDoneHandler={modalDoneHandler} text={"You have successfully deposited"} hash={depositData?.hash} />}
            {modalCloseDoneIsOpen && <DoneModal modalDoneHandler={modalCloseDoneHandler} text={"You have successfully closed the borrow"} hash={closeBorrowData?.hash} />}

            {modalCloseIsOpen && (
                <Modal onClose={modalCloseHandler} title='Are you shure?'>
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



