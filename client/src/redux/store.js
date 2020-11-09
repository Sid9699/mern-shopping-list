import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";

import ReduxThunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ReduxThunk))
);
