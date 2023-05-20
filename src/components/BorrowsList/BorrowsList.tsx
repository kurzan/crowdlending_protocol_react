import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './BorrowsList.css';
import styles from './BorrowList.module.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useData } from '../../hooks/useData';
//@ts-ignore
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BorrowCard from '../BorrowCard/BorrowCard';
import { TBorrow } from '../../services/types';
import { Search } from '../Search/Search';
import Stats from '../Stats/Stats';
import BorrowsTabs from '../BorrowsTabs/BorrowsTabs';

type TSortedBorrow = {
  statusSort: number;
  idSort: number;
  item: TBorrow;
}

const tabs = [
  {
    label: "Open",
    status: 0
  },
  {
    label: "Active",
    status: 1
  },
  {
    label: "Closed",
    status: 2
  },
  {
    label: "Canceled",
    status: 3
  }
];

export type TTab = {
  label: string;
  status: number;
}

const BorrowsList = () => {
  const [activeTab, setActiveTab] = useState<TTab>(tabs[0]);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const [page, setPage] = useState(1);
  const { isError, borrows } = useData();

  const [sortedBorrows, setSortedBorrows] = useState<TBorrow[] | undefined>();
  const [searchValue, setSearchValue] = useState();

  const selectPageHandle = (selectedPage: any) => { 
    if (borrows && selectedPage >= 1 &&
      selectedPage <= Math.ceil(borrows.length / 8) &&
      selectedPage !== page) {
      setPage(selectedPage)
    }
  };

  useEffect(() => {
    const sortedStatuses = [0];

    const sortedData = borrows?.reduce(
      (acc: TSortedBorrow[], item) => {
        acc.push({
          statusSort: sortedStatuses.indexOf(item.status),
          idSort: Number(item.borrowId),
          item
        });
        return acc;
      },
      []
    )
      .sort((a, b) => (b.idSort - a.idSort) || (a.statusSort - b.statusSort))
      .map(({ item }) => item);

    setSortedBorrows(sortedData);
  }, [borrows])


  const filteredBorrows = useMemo(() => {
    try {
      return sortedBorrows?.filter(item => item.status === activeTab.status)
    } catch (error) {
      return sortedBorrows;
    }
  }, [sortedBorrows, activeTab.status])

  const searchBorrows = useMemo(
    () => {
      try {
        const search = searchValue || '';
        return filteredBorrows?.filter(
          item => item.companyName.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
        );
      } catch (error) {
        return filteredBorrows;
      }
    },
    [filteredBorrows, searchValue]
  );

  return (
    <div className={styles.container}>
      {borrows ? <div className={styles.heading}>
        <Search placeholder="Search" setSearch={setSearchValue} />
        <Stats />
      </div> : <Skeleton containerClassName={styles.skeletonHeading} count={1} height={50} width={"100%"} borderRadius={"0.5rem"} />}
      <BorrowsTabs tabs={tabs} onTabClick={handleTabClick} activeTab={activeTab} />
      <div className={styles.list}>
        
        {!borrows ?
          <>
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
          </>
          
          :
          <>
          {borrows && searchBorrows && searchBorrows?.slice(page * 8 - 8, page * 8).map((borrow, index) =>
             <BorrowCard key={index} borrow={borrow} />)}
          </>
        }
      </div>

      {
        borrows && borrows.length > 0 && <div className='pagination'>
          <div className='arrows' onClick={() => selectPageHandle(page - 1)}>
            <MdKeyboardArrowLeft size={25} />
          </div>
          <div className='pageNumbers'>
            {
              [...Array(Math.ceil(filteredBorrows ? filteredBorrows.length / 8 : 1))].map((n, i) => {
                return <div
                  key={i}
                  className={`num ${page === i + 1 ? `numActive` : ''}`}
                  onClick={() => selectPageHandle(i + 1)}>{i + 1}</div>
              })
            }
          </div>
          <div className='arrows' onClick={() => selectPageHandle(page + 1)}>
            <MdKeyboardArrowRight size={25} />
          </div>
        </div>
      }
    </div>

  )
}

export default BorrowsList;