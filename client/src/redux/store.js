import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import authSlice from "./reducers/auth";
import ModalSlice from "./reducers/modal";
import postSlice from "./reducers/post";

const initialState = {};

const reducers = combineReducers({
  auth: authSlice,
  modal: ModalSlice,
  posts: postSlice,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
