import React, { useEffect, useState } from 'react';
import './BorrowsList.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import CompanyLogo from '../CompanyLogo/CompanyLogo';
import { useNavigate } from "react-router-dom";
import { useData } from '../../hooks/useData';
import Status from '../Status/Status';
import { toEth } from '../../services/utils';
import { ethers } from 'ethers';


const BorrowsList = () => {
    const [page, setPage] = useState(1);
    
    const {isLoading, isError, borrows} = useData();

    useEffect(() => {
      console.log(isLoading);

    }, [isLoading])

    const navigate = useNavigate();

    const selectPageHandle = (selectedPage: any) => { // Pagination Logic
        if (borrows && selectedPage >= 1 &&
            selectedPage <= Math.ceil(borrows.length / 5) &&
            selectedPage !== page) {
            setPage(selectedPage)
        }
    };



return (
        <div className='userTable'>
            <h1 className='heading'>
                Займы
            </h1>
            <table>
              <thead>
                <tr>
                    <th className='userHeading'>Компания</th>
                    <th className='userBirth'>Статус</th>
                    <th className='userPhone'>Собрано</th>
                    <th className='userPhone'>Срок / дней</th>
                    <th className='userPhone'>Инвесторы</th>
                    <th className='userAddress'>Ставка</th>
                </tr>
              </thead> 
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
                            <td className='userBirth f-weight'><Status status={borrow.status}/></td>
                            <td className='userPhone'>{borrow.totalBorrowed ? Number(ethers.utils.formatEther(borrow.totalBorrowed)) : 0} из {borrow.borrowingGoal ? Number(ethers.utils.formatEther(borrow.borrowingGoal)) : 0} tBNB</td>
                            <td className='userPhone'>{Number(borrow.borrowingPeriod) / 86400}</td>
                            <td className='userPhone'>{Number(investors)}</td>
                            <td className='interestRate'>{Number(borrow.interestRate)}%</td>
                        </tr>
                        )
                    })
                }
               </tbody> 
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