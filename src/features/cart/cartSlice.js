import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url ="https://course-api.com/react-useReducer-cart-project"

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
    return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err))
})

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: state => {
            state.cartItems = [];
        },
        removeItem: (state, {payload}) => {
            state.cartItems = state.cartItems.filter(item => item.id !== payload);
        },
        increase: (state, {payload}) => {
            const cartItem = state.cartItems.find( item => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, {payload}) => {
            const cartItem = state.cartItems.find( item => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach(item => {
                amount += item.amount;
                total += item.amount * item.price;
            })
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCartItems.pending,
                state => {
                    state.isLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action);
                state.cartItems = action.payload; 
            })
            .addMatcher(getCartItems.rejected, state => {
                state.isLoading = false;
            })
    }
})

// console.log(cartSlice)

export const { 
    clearCart, 
    removeItem,
    increase,
    decrease,
    calculateTotals
 } = cartSlice.actions;

export default cartSlice.reducer