import { FC } from 'react';
import styles from './Box.module.css';

type TBoxProps = {
  children: React.ReactNode;
  title?: string;
  margin?: string | number
};

const Box: FC<TBoxProps> = ({children, title, margin}) => {
  return (
    <>
      <p className={styles.title}>{title}</p>
      <div style={{margin: `${margin}`}} className={styles.container}>
        {children}
      </div>
    </>
  )
};

export default Box;