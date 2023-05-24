import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Tabs.module.css';
import { FC, useEffect, useState } from 'react';

type TTabsProps = {
  tabs: Array<any>;
};

const Tabs: FC<TTabsProps> = ({tabs}) => {

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