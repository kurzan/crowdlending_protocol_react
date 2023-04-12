import React, { useEffect, useState } from 'react';
import './BorrowsList.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import CompanyLogo from '../CompanyLogo/CompanyLogo';
import { useNavigate } from "react-router-dom";
import { useData } from '../../hooks/useData';
import Status from '../Status/Status';


const BorrowsList = () => {
    const [page, setPage] = useState(1);
    
    const {isLoading, isError, borrows} = useData();

    const navigate = useNavigate();

    const selectPageHandle = (selectedPage: any) => { // Pagination Logic
        if (borrows && selectedPage >= 1 &&
            selectedPage <= Math.ceil(borrows.length / 5) &&
            selectedPage !== page) {
            setPage(selectedPage)
        }
    }


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
                    <th className='userAddress'>Ставка</th>
                </tr>
              </thead> 
              <tbody>
                {
                   borrows && borrows.slice(page * 5 - 5, page * 5).map((borrow, index) => {
                        return (
                        
                        <tr key={index} onClick={() => navigate(`/borrows/${borrow.id}`)}>

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
                            <td className='userPhone'>{borrow.totalBorrowed} из {borrow.goal} tBNB</td>
                            <td className='interestRate'>{borrow.interestRate}%</td>
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