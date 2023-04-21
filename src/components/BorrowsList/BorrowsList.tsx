import React, { useCallback, useEffect, useState } from 'react';
import './BorrowsList.css';
import styles from './BorrowList.module.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import CompanyLogo from '../CompanyLogo/CompanyLogo';
import { useNavigate } from "react-router-dom";
import { useData } from '../../hooks/useData';
import Status from '../Status/Status';
import {ethers} from "ethers";
//@ts-ignore
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BorrowCard from '../BorrowCard/BorrowCard';


const BorrowsList = () => {
    const [page, setPage] = useState(1);
    const {isError, borrows} = useData();


    const [portfolios, setPortfolios] =useState<any>();

    const selectPageHandle = (selectedPage: any) => { // Pagination Logic
        if (borrows && selectedPage >= 1 &&
            selectedPage <= Math.ceil(borrows.length / 6) &&
            selectedPage !== page) {
            setPage(selectedPage)
        }
    };

    const getPortfolio = useCallback(() => {
      if (!borrows) return;

      const ports: any = [];

      borrows.forEach(borrow => {
        ports.push({
          borrowId: borrow.borrowId,
          investorts: borrow.investors
        })
      })

      setPortfolios(ports)

      console.log(portfolios)
    }, [borrows]);

    useEffect(() => {
      getPortfolio()
    }, [getPortfolio])

return (
        <div className='userTable'>
            <h1 className='heading'>
                Borrows
            </h1>

            <div className={styles.list}>
              {!borrows ? 
              <Skeleton count={5} height={80} borderRadius={"0.5rem"}/> 
              :
              <>{borrows && borrows.slice(page * 6 - 6, page * 6).map((borrow, index) => <BorrowCard borrow={borrow} />)}</>         
              }
            </div>

            {
                borrows && borrows.length > 0 && <div className='pagination'>
                    <div className='arrows' onClick={() => selectPageHandle(page - 1)}>
                        <MdKeyboardArrowLeft size={25} />
                    </div>
                    <div className='pageNumbers'>
                        {
                            [...Array(Math.ceil(borrows.length / 6))].map((n, i) => {
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