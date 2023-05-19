import styles from './ShortAddress.module.css';
import { getShortAddress } from '../../services/utils';
import { MdContentCopy } from 'react-icons/md';
import { useState } from 'react';

const ShortAddress = ({address}: {address: string | undefined}) => {
  const [isActive, setIsActive] = useState(false);


  const handleCopyClick = () => {
    navigator.clipboard.writeText(address || "");
    setIsActive(true);
    setTimeout(() => setIsActive(false), 200);  
  };

  return (
    <div className={isActive ? styles.container : styles.container + " " + styles.scale} onClick={handleCopyClick} >
      <p>{getShortAddress(address)}</p>
      <MdContentCopy />
    </div>
  );
};

export default ShortAddress;
