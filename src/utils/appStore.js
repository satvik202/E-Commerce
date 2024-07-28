import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import authReducer from './authSlice'
import cartReducer from'./cartSlice'
export default configureStore({
  reducer: {
    product : productReducer,
    auth : authReducer,
    cart : cartReducer
  },
})