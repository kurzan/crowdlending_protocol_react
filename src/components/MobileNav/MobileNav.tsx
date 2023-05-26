import { useMatch, useNavigate } from 'react-router-dom';
import styles from './MobileNav.module.css';
import { FC } from 'react';

type TTabProps = {
  tab: any;
};

const TabItem: FC<TTabProps> = ({tab}) => {

  const navigate = useNavigate();

  const match = useMatch({
    path: tab.path,
    end: tab.path.length === 1,
  })

  return(
        <div onClick={() => {
          navigate(tab.path);
        }} className={match ? styles.active + " " +  styles.tab_element : styles.tab_element}>
          <p className={styles.tab_title}>{tab.title}</p>
        </div>
  )
};


type TTabsProps = {
  tabs: Array<any>;
};


const Tabs: FC<TTabsProps> = ({tabs}) => {

  return (
    <div className={styles.container}>
      {tabs && tabs.map((tab, index) => <TabItem key={index} tab={tab}/>)}
    </div>
  )
};

export default Tabs;