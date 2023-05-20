import React, { FC, useState } from 'react';
import { TTab } from '../BorrowsList/BorrowsList';
import styles from './BorrowsTabs.module.css';

type TTabProps = {
  label:string;
  onClick:any;
  isActive: boolean;
};


const Tab: FC<TTabProps> = ({ label, onClick, isActive }) => {
  return (
    <div className={isActive ? styles.active + " " + styles.tab_element : styles.tab_element} onClick={onClick}>
      {label}
    </div>
  );
};

type TBorrowsTabsProps = {
  tabs: any[];
  onTabClick: any;
  activeTab: TTab;
}

const BorrowsTabs: FC<TBorrowsTabsProps> = ({ tabs, onTabClick, activeTab }) => {
  return (
    <ul className={styles.container}>
      {tabs.map(tab => (
        <Tab
          key={tab.number}
          label={tab.label}
          onClick={() => onTabClick(tab)}
          isActive={tab === activeTab}
        />
      ))}
    </ul>
  );
};

export default BorrowsTabs;
