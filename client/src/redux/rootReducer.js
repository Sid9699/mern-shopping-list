import { combineReducers } from "redux";
import itemReducer from "./items/itemReducer";
import loadingReducer from "./loading";
import errorReducer from "./error/errorReducer";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  items: itemReducer,
  loading: loadingReducer,
  error: errorReducer,
  auth: authReducer,
});

export default rootReducer;
