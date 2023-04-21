import styles from './Tabs.module.css';

const tabs = [
  {
    id: 0,
    title: 'Borows',
  },
  {
    id: 1,
    title: 'Portfolio'
  }
];


const Tabs = () => {
  return (
    <div className={styles.container}>
      {tabs && tabs.map(tab => (
        <div className={styles.tab_element}>
          <p className={styles.tab_title}>{tab.title}</p>
        </div>
      ))}
    </div>
  )
};

export default Tabs;