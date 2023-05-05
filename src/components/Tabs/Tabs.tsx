import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Tabs.module.css';
import { useEffect, useState } from 'react';

const tabs = [
  {
    id: 0,
    title: 'Home',
    path: '/',
  },
  {
    id: 0,
    title: 'Borrows',
    path: '/borrows',
    path2: '/borrows'
  },
  {
    id: 1,
    title: 'Portfolio',
    path: '/portfolio'
  }
];


const Tabs = () => {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      {tabs && tabs.map((tab, index) => (
        <div key={index} onClick={() => {
          setActiveTab(index);
          navigate(tab.path);
        }} className={pathname === tab.path || pathname === tab.path2 ? styles.active + " " +  styles.tab_element : styles.tab_element}>
          <p className={styles.tab_title}>{tab.title}</p>
        </div>
      ))}
    </div>
  )
};

export default Tabs;