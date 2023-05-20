import { FC, useContext, useEffect, useRef } from 'react';
import search_img from '../../images/search.svg';
import styles from './Search.module.css';
import { useSearchParams } from 'react-router-dom';


type TSearch = {
  placeholder: string;
  setSearch?: any;
};

export const Search: FC<TSearch> = ({ placeholder, setSearch }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let search = e.target.value;
    if (search) {
      setSearchParams({search});
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={styles.inputBox}>
      <img src={search_img} alt="search"/>
      <input className={styles.input} placeholder={placeholder} onChange={onChange} value={searchParams.get('search') || ''} />
    </div>
    )
};
