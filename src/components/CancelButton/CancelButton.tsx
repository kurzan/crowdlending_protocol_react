import { Oval } from "react-loader-spinner";
import styles from './CancelButton.module.css';
import { FC } from "react";


type TCacelButtonProps = {
    disabled: boolean;
    onClick: any;
}

const CancelButton: FC<TCacelButtonProps> = ({disabled, onClick}) => {
    return(
        <button disabled={disabled} className={styles.button} onClick={onClick}>
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