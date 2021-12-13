import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { reducers } from "./../reducers/index";
import { getAllUsers } from './../actions/users';

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// Initialize
store.dispatch(getAllUsers());

//SUBSCRIBE
store.subscribe(() => console.log(store.getState()));
