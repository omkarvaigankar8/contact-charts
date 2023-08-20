
import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from 'store/app/store';
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@material-tailwind/react";
// import { ApiProvider } from '@reduxjs/toolkit/query/react';
// import { productsApi } from 'store/features/apiSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <React.StrictMode>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </React.StrictMode>

    </Provider>
  </QueryClientProvider>
);

