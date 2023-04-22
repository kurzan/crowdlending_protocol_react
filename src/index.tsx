import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from './services/web3config';

import Home from './pages/home/Home';
import Borrow from './pages/borrow/Borrow';
import { DataProvider } from './services/providers/DataProvider';
//@ts-ignore
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Portfolio from './pages/portfolio/Portfolio';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/borrows",
    element: <Home />,
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
  },
  {
    path: "/borrows/:id",
    element: <Borrow />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <DataProvider>
            <ReactNotifications />
            <RouterProvider router={router} />
          </DataProvider>
        </RainbowKitProvider>
    </WagmiConfig>  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
