import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser } from '../features/authAPI';


const initialState = {
  loggedInUser : null,
  status : 'idle',
  error : null
};


export const createUserAsync = createAsyncThunk(
  'users/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  'users/checkeUser',
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    return response.data;
  }
);



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(createUserAsync.pending, (state)=>{
        state.status='loading'
    })
    .addCase(createUserAsync.fulfilled, (state, action)=>{
        state.status = 'idle'
        state.loggedInUser = action.payload; 
    })
    .addCase(checkUserAsync.pending, (state)=>{
        state.status='loading'
    })
    .addCase(checkUserAsync.fulfilled, (state, action)=>{
        state.status = 'idle'
        state.loggedInUser = action.payload; 
    })
    .addCase(checkUserAsync.rejected, (state, action)=>{
        state.status = 'idle'
        state.error = action.error
    })
      
  },
});


export const selectLoggedInUser = (state)=> state.auth.loggedInUser
export const selectError = (state)=> state.auth.error



export default userSlice.reducer;