import {combineReducers} from 'redux';
import { cartReducer } from './cartReducers.js';
import {productDetailsReducer, productListReducer} from './productReducers.js';
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./userReducers.js";

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer
});

export default rootReducer;