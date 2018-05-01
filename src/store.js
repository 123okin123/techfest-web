import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import thunkMiddleware from 'redux-thunk';
import {createLogger} from "redux-logger";

import { routerMiddleware } from 'react-router-redux'

const loggerMiddleware = createLogger();


export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
    let middlewares = [
        thunkMiddleware,
        loggerMiddleware
    ];
  if (typeof history === 'object') {
      const historyMiddleware = routerMiddleware(history);
      middlewares = [
        ...middlewares,
          historyMiddleware
      ];
  }



  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  return createStore(
    reducers
  , initialState
  , compose(...enhancers)
  );

  // Extensions
  //store.runSaga = sagaMiddleware.run

}
