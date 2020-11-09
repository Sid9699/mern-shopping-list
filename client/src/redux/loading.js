export const toggleLoadingState = () => {
  return {
    type: "CHANGE_LOADING",
  };
};

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case "CHANGE_LOADING":
      return !state;
    default:
      return state;
  }
};

export default loadingReducer;
