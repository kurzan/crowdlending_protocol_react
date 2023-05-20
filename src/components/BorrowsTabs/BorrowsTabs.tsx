import React, { FC, useState } from 'react';
import { TTab } from '../BorrowsList/BorrowsList';
import styles from './BorrowsTabs.module.css';

type TBorrowsTabsProps = {
  tabs: any[];
  onTabClick: any;
  activeTab: TTab;
}

const BorrowsTabs: FC<TBorrowsTabsProps> = ({ tabs, onTabClick, activeTab }) => {
  return (
    <>
    <ul className={styles.container}>
      {tabs.map((tab, index) => (
        <div key={index} className={tab === activeTab ? styles.active + " " + styles.tab_element : styles.tab_element} onClick={() => onTabClick(tab)}>
          {tab.label}
        </div>
      ))}
    </ul>
    <div className={styles.description}>
      <p>{activeTab.text}</p>
    </div>
    
    </>

  );
};

export default BorrowsTabs;
