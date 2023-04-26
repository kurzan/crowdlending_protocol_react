import {ethers} from 'ethers';

export const getImage = (url) => {
  return fetch(url)
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