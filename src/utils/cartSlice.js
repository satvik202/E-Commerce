import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, deleteItemFromCart, fetchCartByUserId, resetCart, updateCart } from "../features/cartAPI";

const initialState = {
    items : [],
    status : 'idle'
}

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (item)=>{
        const response = await addToCart(item);
        return response.data;
    }
)
export const fetchCartByUserIdAsync = createAsyncThunk(
    'cart/fetchCartByUserId',
    async (id)=>{
        const response = await fetchCartByUserId(id);
        return response.data;
    }
)
export const updateCartAsync = createAsyncThunk(
    'cart/updateCart',
    async (update)=>{
        const response = await updateCart(update);
        return response.data;
    }
)
export const deleteItemFromCartAsync = createAsyncThunk(
    'cart/deleteItemFromCart',
    async (id)=>{
        const response = await deleteItemFromCart(id);
        return response.data;
    }
)
export const resetCartAsync = createAsyncThunk(
    'cart/resetCart',
    async (id)=>{
        const response = await resetCart(id);
        return response.data;
    }
)



const cartSlice = createSlice({
    name : 'cart',
    initialState,
    extraReducers : (builder) =>{
        builder
        .addCase(addToCartAsync.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(addToCartAsync.fulfilled, (state, action)=>{
            state.items.push(action.payload);
            state.status= 'idle'
        })
        .addCase(fetchCartByUserIdAsync.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(fetchCartByUserIdAsync.fulfilled, (state, action)=>{
            state.items=action.payload;
            state.status= 'idle'
        })
        .addCase(updateCartAsync.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(updateCartAsync.fulfilled, (state, action)=>{
            const index = state.items.findIndex(item=> item.id===action.payload.id)
            state.items[index]=action.payload;
            state.status= 'idle'
        })
        .addCase(deleteItemFromCartAsync.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(deleteItemFromCartAsync.fulfilled, (state, action)=>{
            const index = state.items.findIndex(item=> item.id===action.payload.id)
            state.items.splice(index, 1)
            state.status= 'idle'
        })
        .addCase(resetCartAsync.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(resetCartAsync.fulfilled, (state, action)=>{
            state.items = [];
        })
    }
})

export const selectCart = (state)=> state.cart.items

export default cartSlice.reducer