import {combineReducers} from 'redux';
import { cartReducer } from './cartReducers.js';
import {productDetailsReducer,
   productListReducer} from './productReducers.js';
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./userReducers.js";
import { orderCreateReducer, orderDetailReducer, orderPayReducer } from "./orderReducers";

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
});

export default rootReducer;