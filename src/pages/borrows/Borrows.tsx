import { useEffect } from "react";
import BorrowsList from "../../components/BorrowsList/BorrowsList";
import LayoutPage from "../layout/Layout";

const Borrows = () => {
 
  return(
      <LayoutPage>
        <BorrowsList />
      </LayoutPage>
  )
};

export default Borrows;