import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

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
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/borrows",
    element: <Borrows />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/borrows/:id",
    element: <Borrow />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/addborrow",
    element: <CreateBorrow />,
    errorElement: <ErrorBoundary />
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <DataProvider>
            <InputProvider>
              <RouterProvider router={router} />
            </InputProvider>
          </DataProvider>
        </RainbowKitProvider>
    </WagmiConfig>  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
