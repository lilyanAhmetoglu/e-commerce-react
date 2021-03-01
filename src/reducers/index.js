import { combineReducers } from 'redux';
import user from './user_reducer';
import customers from './customer_reducer'
import orders from './order_reducer'
const rootReducer = combineReducers({
    user,
    customers,
    orders
});
export default rootReducer;