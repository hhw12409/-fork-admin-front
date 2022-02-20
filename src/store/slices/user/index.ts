import { createSlice } from '@reduxjs/toolkit';
import { signup } from './async/signup';

const initialState = {
  isFetching: false,
  name: '',
  email: '',
  accessToken: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signup.pending, (state, action) => {
      state.isFetching = true;
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log(action)
      state.isFetching = false;
      if (action?.payload?.token) {
        state.accessToken = action.payload.token;
        state.email = action.payload.email;
        state.name = action.payload.name;
      } else {
        state.accessToken = "";
        state.email = "";
        state.name = "";
      }
    })
    builder.addCase(signup.rejected, (state, action) => {
      state.isFetching = false;
    })
  },
});

export default userSlice;