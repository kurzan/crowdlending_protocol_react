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

type TSortedBorrow = {
  statusSort: number;
  idSort: number;
  item: TBorrow;
}


const BorrowsList = () => {
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
      .sort((a, b) => (b.statusSort - a.statusSort) || (a.idSort - b.idSort))
      .map(({ item }) => item);

    setSortedBorrows(sortedData);
  }, [borrows])

  const searchBorrows = useMemo(
    () => {
      const search = searchValue || '';
      return sortedBorrows?.filter(
        item => item.companyName.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
      );
    },
    [sortedBorrows, searchValue]
  );

  return (
    <div className={styles.container}>
      {borrows ? <div className={styles.heading}>
        <Search placeholder="Search" setSearch={setSearchValue} />
        <Stats />
      </div> : <Skeleton containerClassName={styles.skeletonHeading} count={1} height={50} width={"100%"} borderRadius={"0.5rem"} />}
      <div className={styles.list}>
        {!borrows ?
          <>
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
            <Skeleton containerClassName={styles.skeletonList} count={1} borderRadius={"0.5rem"} />
          </>
          
          :
          <>{borrows && searchBorrows?.slice(page * 8 - 8, page * 8).map((borrow, index) =>
             <BorrowCard key={index} borrow={borrow} />)}</>
        }
      </div>

      {
        borrows && borrows.length > 0 && <div className='pagination'>
          <div className='arrows' onClick={() => selectPageHandle(page - 1)}>
            <MdKeyboardArrowLeft size={25} />
          </div>
          <div className='pageNumbers'>
            {
              [...Array(Math.ceil(borrows.length / 8))].map((n, i) => {
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