import axios from "axios";
import { ADD_CUSTOMER,GET_CUSTOMER } from "./types";
import { CUSTOMER_SERVER } from "../components/utils/misc";

export function getCustomers() {
    const request = axios
      .get(`${CUSTOMER_SERVER}/`)
      .then((response) => response.data);
  
    return {
      type: GET_CUSTOMER,
      payload: request,
    };
  }
  export function addCustomer(dataToSubmit, existingCustomers) {
    const request = axios
      .post(`${CUSTOMER_SERVER}/`, dataToSubmit)
      .then((response) => response.data);
    return {
      type: ADD_CUSTOMER,
      payload: request,
    };
  }