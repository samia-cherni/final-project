import React from 'react';
import ReactDOM from 'react-dom';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import App from './App';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose}from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import {BrowserRouter} from 'react-router-dom';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

