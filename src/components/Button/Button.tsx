import { FC, useEffect, useState } from "react";
import styles from "./Button.module.css";
import { useAccount, useConnect } from 'wagmi';

type TButtonProps = {
  title: string;
  onClick?: any;
  disabled?: boolean;
};

const Button: FC<TButtonProps> = ({title, onClick, disabled}) => {

  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  const [isCon, setIsCon] = useState(false);

  useEffect(() => {
    setIsCon(isConnected)
  }, [isConnected])

  return(
      <button disabled={disabled} onClick={onClick} className={styles.button}>
        <p className={styles.text}>{isCon ? title : "Подключите кошелек"}</p>
      </button>
  )
};

export default Button;