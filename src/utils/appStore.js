import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './productListSlice'

export default configureStore({
  reducer: {
    productList : productListReducer,
  },
})