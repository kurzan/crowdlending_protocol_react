import { FC, useEffect, useState } from 'react';
import search_img from '../../images/search.svg';
import styles from './Search.module.css';
import { useSearchParams } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

type TSearch = {
  placeholder: string;
  setSearch?: any;
};

export const Search: FC<TSearch> = ({ placeholder, setSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value.toLowerCase();
    setSearchValue(newSearchValue);

    const search = searchParams.get("search");
    if (!newSearchValue && search) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("search");
      setSearchParams(newParams);
    } else if (newSearchValue !== search) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("search", newSearchValue);
      setSearchParams(newParams);
    }
  };

  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams, setSearchValue]);

  const handleReset = () => {
    // Удаляем параметр search из параметров поиска
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
    setSearchValue("");
  };

  return (
    <div className={styles.inputBox}>
      <img src={search_img} alt="search"/>
      <input className={styles.input} placeholder={placeholder} onChange={handleChange} value={searchValue || ''} />
      {searchValue.length > 0 && <MdClose size={30} color='#BCC5CD' onClick={handleReset}/>}
    </div>
  );
}
