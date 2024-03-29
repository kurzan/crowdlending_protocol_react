import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
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
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedBorrowsTabs } from '../../services/tabs';

type TSortedBorrow = {
  statusSort: number;
  idSort: number;
  item: TBorrow;
}

export type TTab = {
  label: string;
  status: number;
  text: string;
}

type TBorrowListProps = {
  borrows: TBorrow[] | null;
  header?: boolean;
  defaultTab?: number;
}

const BorrowsList: FC<TBorrowListProps> = ({borrows, header = true, defaultTab}) => {
  const { t } = useTranslation();
  const tabs = getLocalizedBorrowsTabs(t);
  
  const [activeTab, setActiveTab] = useState<TTab>(tabs[1]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const [page, setPage] = useState(1);
  const { isError } = useData();

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
    setPage(1)
  }, [activeTab])

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
      if (activeTab.status === -1) return sortedBorrows;
      return sortedBorrows?.filter(item => item.status === activeTab.status);
    } catch (error) {
      return sortedBorrows;
    }
  }, [sortedBorrows, activeTab.status])


  const searchBorrows = useMemo(
    () => {
      try {
        const searchValue = searchParams.get('search') || '';
        const filtered = filteredBorrows?.filter(
          item => {
            const borrower = item.borrower?.toLocaleLowerCase() || '';
            const companyName = item.companyName?.toLocaleLowerCase() || '';
            return borrower.includes(searchValue) || companyName.includes(searchValue);
          }
        );
        return filtered;
      } catch (error) {
        return filteredBorrows;
      }
    },
    [filteredBorrows, searchParams]
  );
  

  return (
    <div className={styles.container}>
      {header && <>
        {borrows ? <div className={styles.heading}>
          <Search placeholder={t("Search")} setSearch={setSearchValue} />
          <Stats />
        </div> : <Skeleton containerClassName={styles.skeletonHeading} count={1} height={50} width={"100%"} borderRadius={"0.5rem"} />}
      </>}


      
      <BorrowsTabs tabs={tabs} onTabClick={handleTabClick} activeTab={activeTab} count={filteredBorrows?.length} defaultTab={defaultTab} />
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