import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
const persistor = persistStore(store);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
      <App />
      </PersistGate>
    
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

