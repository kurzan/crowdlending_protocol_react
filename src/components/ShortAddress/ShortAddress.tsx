import styles from './ShortAddress.module.css';
import { getShortAddress } from '../../services/utils';
import { MdContentCopy } from 'react-icons/md';

const ShortAddress = ({address}: {address: string | undefined}) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(address || "");
  };

  return (
    <div className={styles.container} onClick={handleCopyClick}>
      <p>{getShortAddress(address)}</p>
      <MdContentCopy />
    </div>
  );
};

export default ShortAddress;
