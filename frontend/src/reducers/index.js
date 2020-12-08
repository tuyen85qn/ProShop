import {combineReducers} from 'redux';
import { cartReducer } from './cartReducers.js';
import {productDetailsReducer, productListReducer} from './productReducers.js';

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

export default rootReducer;