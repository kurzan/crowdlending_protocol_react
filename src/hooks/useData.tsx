import { DataContext } from "../services/providers/DataProvider";
import { useContext } from 'react';
import { InputContext } from "../services/providers/InputProvider";

export const useData = () => useContext(DataContext);
export const useInputAmount = () => useContext(InputContext);