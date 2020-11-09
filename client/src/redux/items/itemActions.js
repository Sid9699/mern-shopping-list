import { ADD_ITEM, GET_ITEMS, REMOVE_ITEM } from "./itemTypes";
import axios from "axios";
import { toggleLoadingState } from "../loading";
import { returnErrors } from "../error/errorActions";
import { tokenConfig } from "../auth/authActions";

export const getItems = (userId) => (dispatch) => {
  dispatch(toggleLoadingState());
  axios
    .get("https://shopping-list-app-sid9699.herokuapp.com/api/items", {
      params: { userId: userId },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      });
      dispatch(toggleLoadingState());
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (name, userId) => (dispatch, getState) => {
  axios
    .post(
      "https://shopping-list-app-sid9699.herokuapp.com/api/items",
      { name, userId },
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const removeItem = (id) => (dispatch, getState) => {
  axios
    .delete(
      `https://shopping-list-app-sid9699.herokuapp.com/api/items/${id}`,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: REMOVE_ITEM,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
