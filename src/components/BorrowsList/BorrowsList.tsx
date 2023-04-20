import React, { useCallback, useEffect, useState } from 'react';
import './BorrowsList.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import CompanyLogo from '../CompanyLogo/CompanyLogo';
import { useNavigate } from "react-router-dom";
import { useData } from '../../hooks/useData';
import Status from '../Status/Status';
import {ethers} from "ethers";
//@ts-ignore
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CoinIcon from '../CoinIcon/CoinIcon';
import TotalBar from '../TotalBar/TotalBar';


const BorrowsList = () => {
    const [page, setPage] = useState(1);
    const {isError, borrows} = useData();
    const navigate = useNavigate();

    const [portfolios, setPortfolios] =useState<any>();

    const selectPageHandle = (selectedPage: any) => { // Pagination Logic
        if (borrows && selectedPage >= 1 &&
            selectedPage <= Math.ceil(borrows.length / 5) &&
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
            <table>
              <thead>
                <tr>
                    <th className='userHeading'>Company</th>
                    <th className='statusBorr'>Status</th>
                    <th className='totalBorr'>Total borrowed</th>
                    <th className='borrPeriod'>Period, days</th>
                    <th className='investors'>Investors</th>
                    <th className='interestRate'>Rate</th>
                </tr>
              </thead> 

              {!borrows ? <Skeleton count={5} height={80} borderRadius={"0.5rem"}/> : (
                              <tbody>
                              {
                                 borrows && borrows.slice(page * 5 - 5, page * 5).map((borrow, index) => {
              
                                      let investors = 0;
              
                                      if (borrow.investors && borrow.investors.length) {
                                        investors = borrow.investors.length;
                                      }
              
                                      return (
                                      
                                      <tr key={index} onClick={() => navigate(`/borrows/${Number(borrow.borrowId)}`)}>
              
                                          <td>
                                              <div className='userDetails'>
                                                  <div className='userPic'>
                                                      <CompanyLogo src={borrow.image} alt={borrow.companyName} />
                                                  </div>
                                                  <div className='userHandles'>
                                                      <p className='userName'>{borrow.companyName}</p>
                                                      <div className='userEmail'>{borrow.description}</div>
                                                  </div>
                                              </div>
                                          </td>
                                          <td className='statusBorr f-weight'><Status status={borrow.status}/></td>
                                          <td className='totalBorr'><TotalBar from={Number(ethers.utils.formatEther(borrow.totalBorrowed))} to={Number(ethers.utils.formatEther(borrow.borrowingGoal))} /></td>
                                          <td className='borrPeriod'>{Number(borrow.borrowingPeriod) / 86400}</td>
                                          <td className='investors'>{Number(investors)}</td>
                                          <td className='interestRate'>{Number(borrow.interestRate)}%</td>
                                      </tr>
                                      )
                                  })
                              }
                             </tbody> 
              )}

            </table>

            {
                borrows && borrows.length > 0 && <div className='pagination'>
                    <div className='arrows' onClick={() => selectPageHandle(page - 1)}>
                        <MdKeyboardArrowLeft size={25} />
                    </div>
                    <div className='pageNumbers'>
                        {
                            [...Array(Math.ceil(borrows.length / 5))].map((n, i) => {
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