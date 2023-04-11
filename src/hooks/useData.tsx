import { DataContext } from "../services/providers/DataProvider";
import { useContext } from 'react';

export const useData = () => useContext(DataContext);