import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { AuthProvider } from './Store/Context/AuthContext';
import { DataProvider } from './Store/Context/dataContext';
import { store } from './Store/store';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <DataProvider>
          <App />
        </DataProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
