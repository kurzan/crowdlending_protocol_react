import {ethers} from 'ethers';

export const ONE_DAY_IN_SEC = 86400;

export const checkIsImage = (url) => {
  const options = {
    method: 'GET',
    mode: 'cors',     
    headers: {
      'Access-Control-Allow-Origin': '*'   
      }
    }

  return fetch(`${url}?noCache='dsfdsfd'` , options)
    .then(res => {
      if(res.ok) {
        return res.status
      }

      return Promise.reject(res.status)
    })
};

export const getDate = (timestamp) => {
  let date = new Date(Number(timestamp) * 1000);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();

  return `${month}/${day}/${year}`
};


export const getShortAddress = (address) => {
  if(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return '';
};


export const getShortAmount = (amount) => {
  if(amount.toString().length > 6) {
    return `~${amount.slice(0, 5)}`
  }

  return amount;
};

export const getYearRate = (amount, rate, repiod) => {
  return ((Number(amount) / 10 ** 18) * (rate / 100) * (repiod / ONE_DAY_IN_SEC)) / 365;
};


export const formattedDate = (timestamp) => {

  const date = new Date(timestamp*1000); 
  const year = date.getFullYear();
  const month = (date.getMonth()+1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day} at ${hour}:${minutes}`;

}