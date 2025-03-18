import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './Features/menuSlice';
import cartReducer from './Features/cartSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;