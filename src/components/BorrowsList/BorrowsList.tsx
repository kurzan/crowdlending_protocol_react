import React, { useEffect, useState } from 'react';
import './BorrowsList.css';
import { GoKebabVertical } from 'react-icons/go';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';


const mockBorrows = [
  {
    image: '',
    companyName: 'Сбербанк',
    description: 'Банковская деятельность',
    status: 'Активный',
    totalBorrowed: 0.88,
    interestRate: 3
  },
  {
    image: '',
    companyName: 'Сбербанк',
    description: 'Банковская деятельность',
    status: 'Активный',
    totalBorrowed: 0.88,
    interestRate: 3
  },
  {
    image: '',
    companyName: 'Сбербанк',
    description: 'Банковская деятельность',
    status: 'Активный',
    totalBorrowed: 0.88,
    interestRate: 3
  },
  {
    image: '',
    companyName: 'Сбербанк',
    description: 'Банковская деятельность',
    status: 'Активный',
    totalBorrowed: 0.88,
    interestRate: 3
  },
  {
    image: '',
    companyName: 'Сбербанк',
    description: 'Банковская деятельность',
    status: 'Активный',
    totalBorrowed: 0.88,
    interestRate: 3
  },
  {
    image: '',
    companyName: 'Сбербанк',
    description: 'Банковская деятельность',
    status: 'Активный',
    totalBorrowed: 0.88,
    interestRate: 3
  },
]




//Logic Part
const BorrowsList = () => {
    const [borrows, setBorrows] = useState(mockBorrows);
    const [page, setPage] = useState(1);

    const selectPageHandle = (selectedPage: any) => { // Pagination Logic
        if (selectedPage >= 1 &&
            selectedPage <= Math.ceil(borrows.length / 5) &&
            selectedPage !== page) {
            setPage(selectedPage)
            console.log(page)
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
                    <th className='contact'></th>
                    <th className='userPhone'>Собрано</th>
                    <th className='userAddress'>Ставка</th>
                </tr>
              </thead> 
              <tbody>
                {
                    borrows.slice(page * 5 - 5, page * 5).map((borrow, index) => {
                        return (<tr key={index}>
                            <td>
                                <div className='userDetails'>
                                    <div className='userPic'>
                                        <img src={borrow.image} alt={borrow.companyName} />
                                    </div>
                                    <div className='userHandles'>
                                        <p className='userName'>{borrow.companyName}</p>
                                        <div className='userEmail'>{borrow.description}</div>
                                    </div>
                                </div>
                            </td>
                            <td className='userBirth f-weight'>{borrow.status}</td>
                            <td className='contact'><button className='contactCTA'>Contact</button></td>
                            <td className='userPhone f-weight'>{borrow.totalBorrowed}</td>
                            <td className='userAddress f-weight'>{borrow.interestRate}</td>
                        </tr>)
                    })
                }
               </tbody> 
            </table>


            {
                borrows.length > 0 && <div className='pagination'>
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