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
  let month = date.getMonth();
  let day = date.getDate();
  let year = date.getFullYear();

  return `${month}/${day}/${year}`
};


export const getShortAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

export const getYearRate = (amount, rate, repiod) => {
  return (((Number(amount) / 10 ** 18) * rate * ((repiod / ONE_DAY_IN_SEC) / 365)) / 100);
};