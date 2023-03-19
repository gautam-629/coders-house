import { configureStore } from '@reduxjs/toolkit'
import auth from './AuthSlice'
import  activate  from './activated';
export const store = configureStore({
  reducer: {
    auth,
    activate,
  },
})