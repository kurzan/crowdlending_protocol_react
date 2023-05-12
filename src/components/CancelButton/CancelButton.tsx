import { Oval } from "react-loader-spinner";
import styles from './CancelButton.module.css';
import { FC, useState } from "react";
import { useWaitForTransaction } from "wagmi";


type TCacelButtonProps = {
    disabled: boolean;
    onClick: any;
    data: any;
}

const CancelButton: FC<TCacelButtonProps> = ({data, disabled, onClick}) => {

    const { data: dataWaitInvest, isError: errorWaitInvest, isLoading: loadingWaitInvest } = useWaitForTransaction({
        hash: data?.hash
      })


    return(
        <button disabled={disabled || loadingWaitInvest} className={styles.button} onClick={onClick}>
        {disabled ? <Oval
            height={20}
            width={20}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={4}
            strokeWidthSecondary={2}
        /> :
        <p className={styles.buttonText}>Cancel</p>}
        </button>
    )
};

export default CancelButton;