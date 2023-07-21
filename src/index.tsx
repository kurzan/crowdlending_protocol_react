import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import './i18n';

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from './services/web3config';

import Home from './pages/home/Home';
import Borrow from './pages/borrow/Borrow';
import Borrows from './pages/borrows/Borrows';
import { DataProvider } from './services/providers/DataProvider';
import Portfolio from './pages/portfolio/Portfolio';
import { InputProvider } from './services/providers/InputProvider';
import CreateBorrow from './pages/create-borrow/CreateBorrow';
import LayoutPage from './pages/layout/Layout';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <DataProvider>
            <InputProvider>
              <BrowserRouter>
                  <Routes>
                    <Route path='/' element={<LayoutPage />}>
                      <Route index element={<Home/>}/>
                      <Route path='borrows' element={<Borrows/>}/>
                      <Route path='portfolio/*' element={<Navigate to="./investments"/>}/>
                      <Route path='portfolio/investments' element={<Portfolio/>}/>
                      <Route path='portfolio/borrows' element={<Portfolio/>}/>
                      <Route path='borrows/:id' element={<Borrow/>}/>
                      <Route path='borrows/addborrow' element={<CreateBorrow/>}/>
                    </Route>
                  </Routes>
              </BrowserRouter>  
            </InputProvider>
          </DataProvider>
        </RainbowKitProvider>
    </WagmiConfig>  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
