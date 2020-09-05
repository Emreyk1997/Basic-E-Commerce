import { combineReducers, createStore } from 'redux';
import CartReducer from './CartReducer';
import FilterReducer from './FilterReducer';

const rootReducer = combineReducers({
  CartReducer: CartReducer,
  FilterReducer,
});

export default rootReducer;
export const store = createStore(rootReducer);
