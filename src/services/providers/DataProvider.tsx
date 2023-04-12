import { addDoc, getDocs, collection } from "@firebase/firestore";
import { createContext, FC, useEffect, useMemo, useState } from "react";
import { db } from '../firebase';
import { TBorrow } from "../types";
import { useContractRead } from "wagmi";
import { contract } from "../web3config";

interface IContext {
  borrows: TBorrow[] | null,
  isLoading: boolean,
  isError: boolean,
}

export const DataContext = createContext<IContext>({} as IContext);

export const DataProvider = ({children}: {children: any}) => {
  const [borrows, setBorrows] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [borrowsIds, setBorrowsIds] = useState<number[]>();


  const getBorrowIds = useContractRead({
    address: contract.address,
    abi: contract.abi,
    functionName: 'getBorrowIds',
    watch: true,
    select: (data: any) => {
      let borrowsIdsArray: number[] = [];
      data.map((item: any) => borrowsIdsArray.push(Number(item)));
      return borrowsIdsArray
    },
    onSuccess(data) {
      setBorrowsIds(data);
    },
  });


  const getBorrow = useContractRead({
    address: contract.address,
    abi: contract.abi,
    functionName: 'getBorrow',
    args: [0],
    watch: true,
    onSuccess(data) {
      console.log(data);
    },
  });


  // const getAllBorrows = () => {
  //   if (borrowsIds && borrowsIds.length) {
  //     borrowsIds.forEach(borrow => {

  //     })
  //   }
  // };



  const getBorrows = async () => {
    setIsLoading(true);

    try {
      await getDocs(collection(db, "borrows"))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
              setBorrows(newData);                
      })
    } catch (error) {
      setIsError(true);
    }
  }


  useEffect(() => {
    getBorrows();
  }, [])

  const value = useMemo(() => ({
    borrows, isLoading, isError, borrowsIds
  }), [borrows, isLoading, isError, borrowsIds])

  return <DataContext.Provider value={value}>
    {children}
  </DataContext.Provider>

};