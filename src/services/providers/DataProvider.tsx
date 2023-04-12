import { addDoc, getDocs, collection } from "@firebase/firestore";
import { createContext, FC, useCallback, useEffect, useMemo, useState } from "react";
import { db } from '../firebase';
import { TBorrow } from "../types";
import { useContractRead,useProvider, useContract } from "wagmi";
import { contract } from "../web3config";

interface IContext {
  borrows: TBorrow[] | null,
  isLoading: boolean,
  isError: boolean,
  borrowsContracts: any
}

export const DataContext = createContext<IContext>({} as IContext);

export const DataProvider = ({children}: {children: any}) => {
  const [borrows, setBorrows] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [borrowsIds, setBorrowsIds] = useState<number[]>();
  const [borrowsContracts, setBorrowsContract] = useState<any>();

  const provider = useProvider();

  const contractBorrow = useContract({
    address: contract.address,
    abi: contract.abi,
    signerOrProvider: provider,
  });


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

  const fetchBorrowsFromContract = useCallback(async () => {
    let borrowsArr = [];

    if (borrowsIds) {
      for (let i = 0; i < borrowsIds.length; i++) {
        const borrow = await contractBorrow?.getBorrow(i);
        borrowsArr.push(borrow);
      }
    }

    setBorrowsContract(borrowsArr);
  }, [contractBorrow, borrowsIds]);

  useEffect(() => {
    getBorrows();
    fetchBorrowsFromContract();
  }, [fetchBorrowsFromContract])

  const value = useMemo(() => ({
    borrows, isLoading, isError, borrowsContracts
  }), [borrows, isLoading, isError, borrowsContracts])

  return <DataContext.Provider value={value}>
    {children}
  </DataContext.Provider>

};