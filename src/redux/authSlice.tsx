import { createSlice } from '@reduxjs/toolkit';

const userInLocalSt=localStorage.getItem('user');
const initialState = {
  user: userInLocalSt? JSON.parse(userInLocalSt):null
};

const authSlice = createSlice({
  name: 'auth',
  initialState ,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));

    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;