import { ADD_CUSTOMER,GET_CUSTOMER } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_CUSTOMER:
        return { ...state, customers: action.payload };
      case ADD_CUSTOMER:
        return {
          ...state,
          addCustomer: action.payload.success,
          customers: action.payload.customers,
        };
    default:
      return state;
  }
}
