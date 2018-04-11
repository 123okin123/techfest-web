import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import thunkMiddleware from 'redux-thunk';
//import {createLogger} from "redux-logger";

//import createSagaMiddleware from 'redux-saga'

//const loggerMiddleware = createLogger();
//const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState = {}) {
  // Create the store with two middlewares
  const middlewares = [
  //  sagaMiddleware
    //, logger
    thunkMiddleware
  ];

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  const store = createStore(
    reducers
  , initialState
  , compose(...enhancers)
  );

  // Extensions
  //store.runSaga = sagaMiddleware.run
  store.asyncReducers = {} // Async reducer registry

  return store
}
