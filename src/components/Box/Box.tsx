import { FC } from 'react';
import styles from './Box.module.css';

type TBoxProps = {
  children: React.ReactNode;
  title?: string;
};

const Box: FC<TBoxProps> = ({children, title}) => {
  return (
    <>
      <p className={styles.title}>{title}</p>
      <div className={styles.container}>
        {children}
      </div>
    </>
  )
};

export default Box;