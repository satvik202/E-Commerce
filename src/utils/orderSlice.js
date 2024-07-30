import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createOrder } from "../features/orderAPI";


const initialState = {
    orders : [],
    status : 'idle',
}

export const createOrderAsync = createAsyncThunk(
    'orders/createUser',
    async (order) => {
      const response = await createOrder(order);
      return response.data;
    }
);


const orderSlice = createSlice({
    name : 'order',
    initialState,
    reducers : {

    },
    extraReducers : (builder)=>{
        builder
        .addCase(createOrderAsync.pending, (state)=>{
            state.status='loading'
        })
        .addCase(createOrderAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.orders.push(action.payload); 
        })
    }
})

export const selectOrders = (state)=>state.order.orders

export default orderSlice.reducer

