import axios from "axios";
import { ADD_ORDER, GET_ACTIVE_ORDER, GET_DONE_ORDER } from "./types";
import { ORDER_SERVER } from "../components/utils/misc";

export function getActiveOrders() {
  const request = axios
    .get(`${ORDER_SERVER}?shipped=false`)
    .then((response) =>{
      return {
        articles: response.data.articles,
      };
    });
  return {
    type: GET_ACTIVE_ORDER,
    payload: request,
  };
}

export function getDoneOrders() {
  const request = axios
    .get(`${ORDER_SERVER}?shipped=true`)
    .then((response) =>{
      return {
        articles: response.data.articles,
      };
    });
  return {
    type: GET_DONE_ORDER,
    payload: request,
  };
}