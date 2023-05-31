import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../types/types';

interface ShoppingCartState {
  cart: { [id: string]: { item: ProductType; size: string; quantity: number } };
  totalPrice: number;
  totalQuantity: number;
}
interface IncrementPayload {
  id: number;
  size: string;
}
const initialState: ShoppingCartState = {
  cart: {},
  totalPrice: 0,
  totalQuantity: 0,
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<{ item: ProductType, size: string }>) => {
      const { item, size } = action.payload;
      const cartItem = state.cart[item.id + size];
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.cart[item.id + size] = { item, size, quantity: 1 };
      }
      state.totalPrice += item.price;
      state.totalQuantity += 1;
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.cart[id];
      if (item) {
        state.totalPrice -= item.quantity * item.item.price;
        state.totalQuantity -= item.quantity;
        delete state.cart[id];
      }
    },
    incrementItemQuantity: (state, action: PayloadAction<IncrementPayload>) => {
      const { id, size } = action.payload;
      const cartItem = state.cart[id + size];
      if (cartItem) {
        cartItem.quantity += 1;
        state.totalPrice += cartItem.item.price;
        state.totalQuantity += 1;
      }
    },
    
    decrementItemQuantity: (state, action: PayloadAction<IncrementPayload>) => {
      const { id, size } = action.payload;
      const cartItem = state.cart[id + size];
      if (cartItem) {
        cartItem.quantity -= 1;
        state.totalPrice -= cartItem.item.price;
        state.totalQuantity -= 1;
      }
    },
    clearCart: (state) => {
      state.cart = {};
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
  clearCart
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;