import { configureStore, createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'App',
    initialState: {
      token: localStorage.getItem('token') || '',
      email: localStorage.getItem('email') || '',
      id: localStorage.getItem('id') || '',
      name: localStorage.getItem('name') || '',
      routines: [],
      dontShowTutorial: Boolean(localStorage.getItem('dontShowTutorial')) || false,
    },
    reducers: {
      updateData: (state, value) => {
        state.token = value.payload.token || '';
        state.email = value.payload.email || '';
        state.id = value.payload.id || '';
        state.name = value.payload.name || '';
      },
      dontShowTutorial: (state) => {
        state.dontShowTutorial = false;
        localStorage.setItem('dontShowTutorial', String(false));
      },
      addRoutine: (state, value) => {
        state.routines.push(value.payload);
      },
    },
  })

export default configureStore({
  reducer: {
    app: appSlice.reducer,
  },
})  