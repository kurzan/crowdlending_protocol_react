import { FC } from 'react';
import Modal from "../Modal/Modal";
import styles from './DoneModal.module.css';
import doneImg from '../../images/done.svg';

type TDoneModalProps = {
  modalDoneHandler: any;
  heading?: string;
  text: string;
  hash?: any;
};

const DoneModal: FC<TDoneModalProps> = ({ modalDoneHandler, heading = "Congratulations", text, hash }) => {
  return (
    <Modal onClose={modalDoneHandler}>
    <div className={styles.waitContainer}>
        <p className={styles.modalHeading}>{heading}</p>
        <img src={doneImg} alt="done" />
        <p className={styles.modalSubHeading}>{text}</p>
        <a href={`https://testnet.bscscan.com/tx/${hash}`} target="_blanc">View transaction</a>
    </div>
</Modal>
  )
};

export default DoneModal;