import {useState, useEffect } from 'react'; 
import { getDate } from '../services/utils';

export function useBorrowDates(borrow: any) {
  const [startDate, setStartDate] = useState<string>();
  const [closetDate, setClosedDate] = useState<string>();

  const [days, setdays] = useState(0);
  const [hours, sethours] = useState(0);
  const [mins, setmins] = useState(0);
  const [secs, setsecs] = useState(0);

  const [timeRemaining, setTimeRemaining] = useState(0);

  const endDate = Number(borrow?.startTime) + Number(borrow?.borrowingPeriod);
  const expired = Date.now() > endDate*1000;
  let investors = 0;
  if (borrow.investors && borrow.investors.length) {
    investors = borrow.investors.length;
  }

  useEffect(() => {
    if (!borrow) return;

    setStartDate(getDate(borrow.createTime));
    setClosedDate(getDate(borrow.closeTime));

  }, [borrow]);

  useEffect(() => {
    if (borrow) {
      const remaining = Number(borrow?.startTime) + Number(borrow?.borrowingPeriod) - Math.floor(Date.now() / 1000);
      setTimeRemaining(remaining);

      if (timeRemaining < 0) return;
      const intervalId = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);

        setsecs(Math.floor((timeRemaining) % 60));
        setmins(Math.floor((timeRemaining / 60) % 60));
        sethours(Math.floor((timeRemaining / 60 / 60) % 24));
        setdays(Math.floor((timeRemaining / 60 / 60 / 24)));
      }, 1000);
      return () => clearInterval(intervalId);

    }

  }, [borrow, timeRemaining]);

  return {
    startDate,
    closetDate,
    days,
    hours,
    mins,
    secs,
    timeRemaining,
    expired,
    investors,
  };
}