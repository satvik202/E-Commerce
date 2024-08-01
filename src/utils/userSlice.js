import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLoggedInUserOrders, fetchLoggedInUser } from "../features/userAPI";
import { updateUser } from "../features/userAPI";

const initialState = {
    userOrders : [],
    userInfo : null,
    status : 'idle',
}

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
    'orders/fetchLoggedInUserOrder',
    async (order) => {
      const response = await fetchLoggedInUserOrders(order);
      return response.data;
    }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
    'orders/fetchLoggedInUser',
    async (userId) => {
      const response = await fetchLoggedInUser(userId);
      return response.data;
    }
);

export const updateUserAsync = createAsyncThunk(
    'users/updateUser',
    async (update) => {
      const response = await updateUser(update);
      return response.data;
    }
  );


const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {

    },
    extraReducers : (builder)=>{
        builder
        .addCase(fetchLoggedInUserOrderAsync.pending, (state)=>{
            state.status='loading'
        })
        .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.userOrders = action.payload
        })
        .addCase(updateUserAsync.pending, (state)=>{
            state.status='loading'
        })
        .addCase(updateUserAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.userOrders = action.payload
        })
        .addCase(fetchLoggedInUserAsync.pending, (state)=>{
            state.status='loading'
        })
        .addCase(fetchLoggedInUserAsync.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.userInfo = action.payload
        })
    }
})


export const selectUserOrders = (state)=>state.user.userOrders
export const selectUserInfo = (state)=>state.user.userInfo

export default userSlice.reducer

