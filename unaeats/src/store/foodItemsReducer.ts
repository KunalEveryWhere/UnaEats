// A. Call
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// B. Declare
export interface FoodItem {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    imgSRC: string;
    dateAndTime: string;
  }

export interface OrderHistoryItem {
    historyID: string;
    itemsOrdered: FoodItem[];
    subTotal: number;
    status: string;
    dateAndTime: string;
  }


// B.-2: Initialize  
export interface FoodItemsInitialState {
    cartItems: FoodItem[]
    historyOfOrders: OrderHistoryItem[]
}
const initialState: FoodItemsInitialState = {
    cartItems: [],
    historyOfOrders: []
}

// C. Define
export const foodItemSlice = createSlice({
    name: 'foodItem',
    initialState,
    reducers: {
        //To add item to cart
        addFoodItem: (state, action: PayloadAction<FoodItem>) => {
            state.cartItems = [...state.cartItems, action.payload];
          },
        //To update items in cart
        updateFoodItem: (state, action: PayloadAction<FoodItem>) => {
            const updatedItem = action.payload;
            const index = state.cartItems.findIndex(item => item.id === updatedItem.id);
            if (index !== -1) {
              state.cartItems[index] = updatedItem;
            }
          },
        //To remove items from cart
        removeFoodItem: (state, action: PayloadAction<number>) => {
            const itemIdToRemove = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== itemIdToRemove);
          },
        //To remove all items from cart
        removeAllFoodItems: state => {
          state.cartItems = [];
        },
        //To add history-Item
        addHistoryItem: (state, action: PayloadAction<OrderHistoryItem>) => {
          state.historyOfOrders = [...state.historyOfOrders, action.payload];
        },
        //To remove a history item
        removeHistoryItem: (state, action: PayloadAction<string>) => {
          const historyIdToRemove = action.payload;
          state.historyOfOrders = state.historyOfOrders.filter(item => item.historyID !== historyIdToRemove);
        },
        //To clear all history (remove all history items)
        removeAllHistoryItems: state => {
          state.historyOfOrders = [];
        },
        },
})

//  D. Export
export const { addFoodItem, removeFoodItem, updateFoodItem, removeAllFoodItems, addHistoryItem, removeHistoryItem, removeAllHistoryItems } = foodItemSlice.actions
export default foodItemSlice.reducer