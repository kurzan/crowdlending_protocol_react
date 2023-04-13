import {useState, useEffect} from "react";


export const useTimer = (time: any) => {
  const [timeRemaining, setTimeRemaining] = useState(time);
  const [days, setdays] = useState(0);
  const [hours, sethours] = useState(0);
  const [mins, setmins] = useState(0);
  const [secs, setsecs] = useState(0);

  // countdown timer
  useEffect(() => {
      if (timeRemaining < 0) return;
      const intervalId = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);


          setsecs(Math.floor((timeRemaining) % 60));
          setmins(Math.floor((timeRemaining / 60) % 60));
          sethours(Math.floor((timeRemaining / 60 / 60) % 24));
          setdays(Math.floor((timeRemaining / 60 / 60 / 24)));
      }, 1000);
      return () => clearInterval(intervalId);
  }, [timeRemaining, time]);


  return { days, hours, mins, secs };
};