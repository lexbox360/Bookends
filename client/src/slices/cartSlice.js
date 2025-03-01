import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: []};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((i) => i._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((i) => i._id === existItem._id ? item : i);
            } else {
                state.cartItems = [...state.cartItems];
            }

            return updateCart(state);
        }
    }
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;