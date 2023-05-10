import { FC } from 'react';
import styles from './Box.module.css';

type TBoxProps = {
  children: React.ReactNode;
  title?: string;
  margin?: string | number;
  bg?: string;
  pd?: string | number;
  width?: string;
};

const Box: FC<TBoxProps> = ({children, title, margin, bg, width, pd = 22}) => {
  return (
    <div className={styles.box}>
      <p className={styles.title}>{title}</p>
      <div style={{width: `${width}`, margin: `${margin}`, backgroundColor: `${bg}`, padding: `${pd}`, overflow: "hidden", overflowX: 'auto'  }} className={styles.container}>
        {children}
      </div>
    </div>
  )
};

export default Box;