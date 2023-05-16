import { addDoc, getDocs, collection } from "@firebase/firestore";
import { createContext, FC, useCallback, useEffect, useMemo, useState } from "react";
import { db } from '../firebase';
import { TBorrow } from "../types";
import { useContractRead, useProvider, useContract, useContractEvent } from "wagmi";
import { contract } from "../web3config";

interface IContext {
  borrows: TBorrow[] | null,
  isError: boolean,
  borrowsIds: number[] | undefined;
}

export const DataContext = createContext<IContext>({} as IContext);

export const DataProvider = ({ children }: { children: any }) => {
  const [borrows, setBorrows] = useState<any | null>(null);
  const [isError, setIsError] = useState(false);
  const [borrowsIds, setBorrowsIds] = useState<number[]>();

  const provider = useProvider();

  const contractBorrow = useContract({
    address: contract.address,
    abi: contract.abi,
    signerOrProvider: provider,
  });


  useContractRead({
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

  const getBorrows = useCallback(async () => {

    try {

      if (!borrowsIds) {
        return
      }


      let borrowsFromContract = [];
      let borrowers: any[] = [];

      await getDocs(collection(db, "borrowers"))
        .then((querySnapshot) => {
          const newData = querySnapshot.docs
            .map((doc) => ({ ...doc.data() }));
          borrowers = newData;
        })


      for (let i = 0; i < borrowsIds.length; i++) {
        const borrow = await contractBorrow?.getBorrow(i);
        borrowsFromContract.push(borrow);
      }

      const mergedArray = borrowsFromContract.map(item1 => {
        const item2 = borrowers.find(item2 => item1.borrower === item2.borrower);
        return Object.assign({}, item1, item2);
      });
      setBorrows(mergedArray);

      console.log(mergedArray)


      console.log(mergedArray)

      
    } catch (error) {
      setIsError(true);
    }
  }, [borrowsIds, contractBorrow]);


  useContractEvent({
    address: contract.address,
    abi: contract.abi,
    eventName: 'borrowActivated',
    listener(node, label, owner) {
      getBorrows();
    },
  });

  useContractEvent({
    address: contract.address,
    abi: contract.abi,
    eventName: 'borrowClosed',
    listener(node, label, owner) {
      getBorrows();
    },
  });

  useContractEvent({
    address: contract.address,
    abi: contract.abi,
    eventName: 'investmentAdd',
    listener(node, label, owner) {
      console.log(node, label, owner)
      getBorrows();
    },
  });

  useContractEvent({
    address: contract.address,
    abi: contract.abi,
    eventName: 'investmentCancel',
    listener(node, label, owner) {
      console.log(node, label, owner)
      getBorrows();
    },
  });


  useEffect(() => {
    getBorrows();

  }, [getBorrows])

  const value = useMemo(() => ({
    borrows, isError, borrowsIds
  }), [borrows, isError, borrowsIds])

  return <DataContext.Provider value={value}>
    {children}
  </DataContext.Provider>

};