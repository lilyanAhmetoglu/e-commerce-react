import { GET_ACTIVE_ORDER, GET_DONE_ORDER } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_ACTIVE_ORDER:
      return { articles: action.payload.articles };
    case GET_DONE_ORDER:
      return { articles: action.payload.articles };
    default:
      return state;
  }
}
