import { configureStore, createSlice } from "@reduxjs/toolkit";
import { userApi } from "./services";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    UPDATE_CART(state, action) {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    },
    ADD_CART(state, action) {
      const newItem = action.payload;
      const existedItemIndex = state.items.findIndex(
        (item) => item?._id === newItem._id
      );

      if (existedItemIndex === -1) {
        state.items.push({
          id: newItem._id,
          name: newItem.name,
          price: newItem.price,
          quantity: newItem.quantity,
          img1: newItem.img1,
        });
        state.totalPrice += newItem.price * newItem.quantity;
      } else {
        state.items[existedItemIndex].quantity += newItem.quantity;
        state.totalPrice += newItem.price * newItem.quantity;
      }
    },
    REMOVE_CART(state, action) {
      const id = action.payload;
      const removeIndex = state.items.findIndex((item) => item._id === id);
      state.totalPrice -=
        state.items[removeIndex].quantity * state.items[removeIndex].price;
      state.items.splice(removeIndex, 1);
    },
    MINUS_CART(state, action) {
      const id = action.payload;
      const minusIndex = state.items.findIndex((item) => item._id === id);

      state.totalPrice -= state.items[minusIndex].price;
      if (state.items[minusIndex].quantity !== 1) {
        state.items[minusIndex].quantity--;
      } else {
        state.items.splice(minusIndex, 1);
      }
    },
  },
});

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export const cartAction = cartSlice.actions;
