import { FC } from 'react';
import { Oval } from "react-loader-spinner";
import Modal from "../Modal/Modal";
import styles from './WaitModal.module.css';

type TWaitModalProps = {
  modalWaitHandler: any;
  text: string;
};

const WaitModal: FC<TWaitModalProps> = ({ modalWaitHandler, text }) => {
  return (
    <Modal onClose={modalWaitHandler}>
      <div className={styles.waitContainer}>
        <p>{text}</p>
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
  )
};

export default WaitModal;