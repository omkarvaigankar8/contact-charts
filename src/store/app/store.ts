import { configureStore } from '@reduxjs/toolkit';
import contactReducer from 'store/features/contact/contactSlice';
const store = configureStore({
    reducer: {
        // user:userReducer
        // user: userReducer,
        contact: contactReducer,
    },
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch