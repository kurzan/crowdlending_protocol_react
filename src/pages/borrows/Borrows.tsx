import { useEffect } from "react";
import BorrowsList from "../../components/BorrowsList/BorrowsList";
import LayoutPage from "../layout/Layout";
import { useData } from "../../hooks/useData";

const Borrows = () => {

  const { isError, borrows } = useData();
 
  return(
      <LayoutPage>
        <BorrowsList borrows={borrows} />
      </LayoutPage>
  )
};

export default Borrows;