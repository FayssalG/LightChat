import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store.ts';

import './global.css';
import 'react-loading-skeleton/dist/skeleton.css';
import ModalProvider from './components/modal/ModalProvider.tsx';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </PersistGate>  

    </Provider>
  </React.StrictMode>,
)
