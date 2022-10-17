import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
      // [...state.items, action.payload]  means, Keep whatever the existing files are there, and also keep/add whatever newly arrived from dispatch
      //dispatch helps to push the data to this REDUX STORE(this page)
      //ex: we sent the data through dispatch in Product.js by using 'addItemToBasket' which should store in 'action.payload'
    }, 
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id  ===  action.payload.id
        // we need to search through that index 'basketItem' which i defined now which can go every single basket item
        // state.items is a redux items. we're trying to matches the ID that we click to remove from, 
        // action.payload.id, whenever we pass through dispatch, it stores in payload. 2:57:00
      );
      
      let newBasket = [...state.items]; // make a copy of current basket

      if(index >= 0) {
        // The items exists in basket.. remove it
        newBasket.splice(index, 1)
        // splice() -> it goto index splicing
        // const months = ['Jan', 'March', 'April', 'June'];
        // months.splice(1, 0, 'Feb');     output: Array ["Jan", "Feb", "March", "April", "June"]
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

      } else {
        console.warn(
          `Can't remove the product (id: ${action.payload.id}) as its not in basket`
        );
      }

      state.items = newBasket;

    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export const selectTotal = (state) => state.basket.items.reduce( (total, item) => total + item.price , 0)
// we r itering through all the items in list we have 'total' which starts at '0' and every single time we iterate we add like 'total + item.price'

export default basketSlice.reducer;

