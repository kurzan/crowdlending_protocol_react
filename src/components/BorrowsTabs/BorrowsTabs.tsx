import React, { FC, useState } from 'react';
import { TTab } from '../BorrowsList/BorrowsList';
import styles from './BorrowsTabs.module.css';

type TBorrowsTabsProps = {
  tabs: any[];
  onTabClick: any;
  activeTab: TTab;
  count?: number;
}

const BorrowsTabs: FC<TBorrowsTabsProps> = ({ tabs, onTabClick, activeTab, count }) => {
  return (
    <>
    <ul className={styles.container}>
      {tabs.map((tab, index) => (
        <div key={index} className={tab === activeTab ? styles.active + " " + styles.tab_element : styles.tab_element} onClick={() => onTabClick(tab)}>
          {tab.label} {tab === activeTab && <span className={styles.countText}>{count}</span>}
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
