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

export const toEth = (amount) => {
  return ethers.utils.formatEther(amount);
}