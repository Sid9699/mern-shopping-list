import { ADD_ITEM, GET_ITEMS, REMOVE_ITEM, CLEAR_ITEMS } from "./itemTypes";

const initialItems = [];

const itemReducer = (state = initialItems, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return [...state, ...action.payload];
    case ADD_ITEM:
      return [...state, action.payload];
    case REMOVE_ITEM:
      return state.filter((item) => item._id !== action.payload);
    case CLEAR_ITEMS:
      return [];
    default:
      return state;
  }
};

export default itemReducer;
