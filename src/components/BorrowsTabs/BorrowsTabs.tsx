import React, { FC, useEffect, useState } from 'react';
import { TTab } from '../BorrowsList/BorrowsList';
import styles from './BorrowsTabs.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type TBorrowsTabsProps = {
  tabs: any[];
  onTabClick: any;
  activeTab: TTab;
  defaultTab?: number;
  count?: number;
}

const BorrowsTabs: FC<TBorrowsTabsProps> = ({ tabs, onTabClick, count, defaultTab = 1 }) => {

  const location = useLocation();
  const queryTab = new URLSearchParams(location.search).get('tab');
  const activeTab = tabs.find(tab => tab.label === queryTab) || tabs[defaultTab];

  const navigate = useNavigate();

  const handleTabClick = (tab: TTab) => {
    const newPath = `${location.pathname}?tab=${tab.label}`;
    navigate(newPath, { replace: true });
    onTabClick(tab);
  };

  useEffect(() => {
    onTabClick(activeTab);
  }, [activeTab,onTabClick])
  
  return (
    <>
    <ul className={styles.container}>
      {tabs.map((tab, index) => (
        <div key={index} className={tab === activeTab ? styles.active + " " + styles.tab_element : styles.tab_element} onClick={() => handleTabClick(tab)}>
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
