import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Actions
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      )
      // copy of the basket
      let newBasket = [...state.items];

      if (index >= 0) {
        // item exists in basket... remove it
        // using filter() would remove everything including id
        newBasket.splice(index, 1)
      } else {
        console.warn(
          'Cant remove product (id:${action.payload.id}) as its not in the basket'
        );
      }
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0)

export default basketSlice.reducer;
