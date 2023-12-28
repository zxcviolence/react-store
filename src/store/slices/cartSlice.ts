import { IProductCart } from '../../components/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface cartState {
  totalPrice: number;
  totalCount: number;
  products: IProductCart[];
}

const initialState: cartState = {
  totalPrice: 0,
  totalCount: 0,
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<IProductCart>) {
      const findProduct = state.products.find(
        (product) =>
          product.id === action.payload.id &&
          product.memory === action.payload.memory &&
          product.colour === action.payload.colour,
      );
      if (findProduct) {
        findProduct.count++;
      } else {
        state.products.push(action.payload);
      }
      state.totalCount = state.products.reduce((count, product) => count + product.count, 0);
      state.totalPrice = state.products.reduce(
        (price, product) => price + product.price * product.count,
        0,
      );
    },
    removeProduct(state, action: PayloadAction<{ id: string; memory: number; colour: string }>) {
      const findProduct = state.products.find(
        (product) =>
          product.id === action.payload.id &&
          product.memory === action.payload.memory &&
          product.colour === action.payload.colour,
      );
      if (findProduct) {
        state.totalPrice -= findProduct.price * findProduct.count;
        state.totalCount -= findProduct.count;
      }
      state.products = state.products.filter(
        (product) =>
          product.id !== action.payload.id ||
          product.memory !== action.payload.memory ||
          product.colour !== action.payload.colour,
      );
    },
    clearCart(state) {
      state.products = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
    minusItem(state, action: PayloadAction<{ id: string; memory: number; colour: string }>) {
      const findProduct = state.products.find(
        (product) =>
          product.id === action.payload.id &&
          product.memory === action.payload.memory &&
          product.colour === action.payload.colour,
      );

      if (findProduct) {
        findProduct.count--;
        state.totalPrice -= findProduct.price;
        state.totalCount--;

        if (findProduct.count === 0) {
          state.products = state.products.filter(
            (product) =>
              product.id !== action.payload.id ||
              product.memory !== action.payload.memory ||
              product.colour !== action.payload.colour,
          );
        }
      }
    },
    plusItem(state, action: PayloadAction<{ id: string; memory: number; colour: string }>) {
      const findProduct = state.products.find(
        (product) =>
          product.id === action.payload.id &&
          product.memory === action.payload.memory &&
          product.colour === action.payload.colour,
      );
      if (findProduct) {
        findProduct.count++;
        state.totalPrice += findProduct.price;
        state.totalCount++;
      }
    },
  },
});

export const { addProduct, removeProduct, clearCart, minusItem, plusItem } = cartSlice.actions;

export default cartSlice.reducer;
