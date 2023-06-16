import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { AuthProvider } from './store/Context/AuthContext/AuthContext';
import { DataProvider } from './store/Context/RestaurantContext/RestaurantDishContext';
import { TransactionTokenProvider } from './store/Context/TransactionToken/TransactionToken';
import { store } from './store/Toolkit/store/store';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <AuthProvider >
      <Provider store={store}>
        <DataProvider>
          <TransactionTokenProvider>
          <App />
          </TransactionTokenProvider>
        </DataProvider>       
      </Provider>
    </AuthProvider>
  // </React.StrictMode>
);
