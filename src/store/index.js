import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
  authtoken: '',
  username: '',
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.authtoken = action.payload.authtoken;
      state.username = action.payload.username;
    },
    logout(state, action) {
      state.isAuthenticated = false;
      state.authtoken = '';
      state.username = '';
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export default store;
