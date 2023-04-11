import { addDoc, getDocs, collection } from "@firebase/firestore";
import { createContext, FC, useEffect, useMemo, useState } from "react";
import { db } from '../firebase';
import { TBorrow } from "../types";

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
    borrows, isLoading, isError
  }), [borrows, isLoading, isError])

  return <DataContext.Provider value={value}>
    {children}
  </DataContext.Provider>

};