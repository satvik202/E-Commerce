import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import authReducer from './authSlice'
import cartReducer from'./cartSlice'
import orderReducer from './orderSlice'
import userReducer from './userSlice'
export default configureStore({
  reducer: {
    product : productReducer,
    auth : authReducer,
    cart : cartReducer,
    order : orderReducer,
    user : userReducer
  },
})

// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import productReducer from './productSlice';
// import authReducer from './authSlice';
// import cartReducer from './cartSlice';
// import orderReducer from './orderSlice';
// import userReducer from './userSlice';
// import { combineReducers } from 'redux';

// const rootReducer = combineReducers({
//   product: productReducer,
//   auth: authReducer,
//   cart: cartReducer,
//   order: orderReducer,
//   user: userReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   // middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }), // if needed
// });

// const persistor = persistStore(store);

// export { store, persistor };