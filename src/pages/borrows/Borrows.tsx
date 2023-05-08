import { useEffect } from "react";
import BorrowsList from "../../components/BorrowsList/BorrowsList";
import LayoutPage from "../layout/Layout";

const Home = () => {
 
  return(
      <LayoutPage>
        <BorrowsList />
      </LayoutPage>
  )
};

export default Home;