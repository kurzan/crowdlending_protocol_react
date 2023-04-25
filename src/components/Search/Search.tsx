import { FC, useContext, useRef } from 'react';
import search_img from '../../images/search.svg';
import styles from './Search.module.css';


type TSearch = {
  placeholder: string;
  setSearch?: any;
};

export const Search: FC<TSearch> = ({ placeholder, setSearch }) => {

  const ref = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.inputBox}>
      <img src={search_img} alt="search"/>
      <input className={styles.input} ref={ref} placeholder={placeholder} onChange={onChange} />
    </div>
    )
};
