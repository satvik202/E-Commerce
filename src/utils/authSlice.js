import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from '../features/authAPI';
import { updateUser } from '../features/userAPI';


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
  async (loginInfo, {rejectWithValue}) => {
    try{
      const response = await checkUser(loginInfo);
      return response.data;
    }catch(err){
      return rejectWithValue(err)
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'users/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  'users/signOut',
  async (userId)=>{
    const response = await signOut(userId)
    return response.data
  }
)



export const userSlice = createSlice({
  name: 'auth',
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
        state.error = action.payload
    })
    .addCase(updateUserAsync.pending, (state)=>{
      state.status='loading'
    })
  .addCase(updateUserAsync.fulfilled, (state, action)=>{
      state.status = 'idle'
      state.loggedInUser = action.payload; 
    })
    .addCase(signOutAsync.pending, (state)=>{
      state.status='loading'
    })
  .addCase(signOutAsync.fulfilled, (state, action)=>{
      state.status = 'idle'
      state.loggedInUser = null; 
    })
      
  },
});


export const selectLoggedInUser = (state)=> state.auth.loggedInUser
export const selectError = (state)=> state.auth.error



export default userSlice.reducer;