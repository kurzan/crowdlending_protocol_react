import styles from './ShareLinks.module.css';
import shareIcon from '../../images/icons/share.svg';
import twIcon from '../../images/socials/icons8-twitter.svg';
import { MdContentCopy } from 'react-icons/md';
import { TBorrow } from '../../services/types';
import DropDown from '../DropDown/DropDown';

const ShareLinks = ({ currentBorrow }: { currentBorrow: TBorrow | undefined }) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(window.location.href || "");
  };

  return (
    <DropDown title='Share' img={shareIcon}>
      <a href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fearlybird.finance%2Fborrows%2F${currentBorrow?.borrowId}&text=Look%20at%20this%20borrow%20on%20%40EarlyBirdFi%20check%20it%3A`} target="_blanc"><img src={twIcon} width={24} height={24} alt="" /> Twitter</a>
      <div onClick={handleCopyClick} className={styles.copyLink}>
        <MdContentCopy color='grey' size={20} /><p>Copy link</p>
      </div>
    </DropDown>
  );
};

export default ShareLinks;
