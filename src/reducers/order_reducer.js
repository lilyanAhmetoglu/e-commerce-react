import { GET_ACTIVE_ORDER, GET_DONE_ORDER, ADD_ORDER } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_ACTIVE_ORDER:
      return { articles: action.payload.articles };
    case GET_DONE_ORDER:
      return { articles: action.payload.articles };
    case ADD_ORDER:
      return { ...state, addOrder: action.payload };
    default:
      return state;
  }
}
