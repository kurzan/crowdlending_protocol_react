import { FC, useEffect, useState } from "react";
import styles from "./Button.module.css";
import { useAccount, useConnect } from 'wagmi';
import { Oval } from 'react-loader-spinner';

type TButtonProps = {
  title: string;
  onClick?: any;
  disabled?: boolean;
  isLoading?: boolean;
};

const Button: FC<TButtonProps> = ({title, onClick, disabled, isLoading}) => {

  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, pendingConnector } = useConnect();

  const [isCon, setIsCon] = useState(false);

  useEffect(() => {
    setIsCon(isConnected)
  }, [isConnected])

  return(
      <button type="button" disabled={disabled} onClick={onClick} className={styles.button}>
        {isLoading && <Oval
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
        />}
        <p className={styles.text}>{isCon ? title : "Подключите кошелек"}</p>
      </button>
  )
};

export default Button;