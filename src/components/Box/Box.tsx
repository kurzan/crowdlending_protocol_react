import { FC } from 'react';
import styles from './Box.module.css';

type TBoxProps = {
  children: React.ReactNode;
  title?: string;
  margin?: string | number;
  bg?: string;
  pd?: string | number;
};

const Box: FC<TBoxProps> = ({children, title, margin, bg, pd = 22}) => {
  return (
    <>
      <p className={styles.title}>{title}</p>
      <div style={{margin: `${margin}`, backgroundColor: `${bg}`, padding: `${pd}` }} className={styles.container}>
        {children}
      </div>
    </>
  )
};

export default Box;