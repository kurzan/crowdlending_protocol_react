import React, { useRef, useState, useEffect } from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import styles from './ShareLinks.module.css';
import shareIcon from '../../images/icons/share.svg';
import twIcon from '../../images/socials/icons8-twitter.svg';
import { MdContentCopy } from 'react-icons/md';

const ShareLinks = () => {
  const [showMenu, setShowMenu] = useState(false);
  const shareRef = useRef(null);

  const handleShareClick = () => {
    setShowMenu(!showMenu);
  };

  const handleOutsideClick = (e: any) => {
    //@ts-ignore
    if (shareRef.current && !shareRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(window.location.href || "");
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  });

  return (
    <div className={styles.share} ref={shareRef} onClick={handleShareClick}>
      <img src={shareIcon} alt="" />
      <p>Share</p>
      {showMenu && (
        <div className={styles.shareMenu}>
          <a href="https://twitter.com"><img src={twIcon} width={24} height={24}  alt="" /> Twitter</a>
          <div onClick={handleCopyClick} className={styles.copyLink}>
            <MdContentCopy color='grey' size={20}/><p>Copy link</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareLinks;
