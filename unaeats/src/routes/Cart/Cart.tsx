import React, { useState } from "react";
import { toast } from "react-toastify";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { updateFoodItem, removeAllFoodItems, FoodItem, addHistoryItem } from "../../store/foodItemsReducer";

//Styles & Messages
import "./Cart.css";
import toastMessages from "../../data/toastMessages.json";

//Components
import Header from "../../components/Header/Header";
import CartItemCard from "../../components/CartItemCard/CartItemCard";
import { CartItemCardProps } from "../../components/CartItemCard/CartItemCard";

//Assets
const DeleteIcon = require("../../assets/icons/icon-delete.png");

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  //To show the cart-items that were added from the home page, retrieved from Redux Store
  const itemsAddedToCart = useSelector((state: RootState) => state.foodItem.cartItems);

  //To update the default value from Redux -> itemsAddedToCart to current instate of cartItemsData
  const getDefaultCartItemsData = (): CartItemCardProps[] => {
    return itemsAddedToCart.map((foodItem: FoodItem) => {
      const cartItem: CartItemCardProps = {
        id: foodItem.id,
        name: foodItem.name,
        price: foodItem.price,
        quantity: foodItem.quantity,
        category: foodItem.category,
        imgSRC: foodItem.imgSRC,
        alt: foodItem.name,
        onChangeQuantity: () => {},
      };
      return cartItem;
    });
  };

  //To store the final Cart-Items to be Submitted
  const [cartItemsData, setCartItemsData] = useState<CartItemCardProps[]>(getDefaultCartItemsData());

  const handleCartItemQuantityChange = (currentCartItem: CartItemCardProps) => {
    const existingCartItemIndex = cartItemsData.findIndex((item) => item.id === currentCartItem.id);
    if (existingCartItemIndex !== -1) {
      // Item with the same id already exists, update the quantity
      const updatedCartItems = [...cartItemsData];
      updatedCartItems[existingCartItemIndex].quantity = currentCartItem.quantity;
      setCartItemsData(updatedCartItems);
    } else {
      // Item with a unique id, add it to the cart
      setCartItemsData((prevCartItems) => [...prevCartItems, currentCartItem]);
    }

    //Update the redux store with the new value
    //⭐️ TODO: Add to update the Redux store only before the user leaves the screen -> before unload
    const updatedItem: FoodItem = {
      id: currentCartItem.id,
      name: currentCartItem.name,
      category: currentCartItem.category,
      price: currentCartItem.price,
      quantity: currentCartItem.quantity,
      imgSRC: currentCartItem.imgSRC,
      dateAndTime: new Date().toDateString(),
    };

    dispatch(updateFoodItem(updatedItem));
  };

  //Random String Generator for HistoryID
  function generateRandomString(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

  //To calculate the sub-total
  const calculateSubtotal = () => {
    let subtotal = 0;
    //We run it locally because calling from redux-store every time is not very efficient.
    for (const item of cartItemsData) {
      subtotal += item.price * item.quantity;
    }
    return subtotal;
  };

  //To clear all items from cart
  const handleClearCartButton = () => {
    if (itemsAddedToCart.length > 0) {
      dispatch(removeAllFoodItems());
      setCartItemsData([]);
      //Toast
      toast.success(toastMessages.clearCart);
      calculateSubtotal();
    } else {
      toast.info(toastMessages.clearCartEmpty);
    }
  };

  const handleCartSubmitButton = () => {
    if (itemsAddedToCart.length > 0) {
      //Calculate Date & Time
      const currentDate = new Date();
      const timeString = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
      const dateString = currentDate.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });

      //Add to Store
      dispatch(
        addHistoryItem({
          historyID: generateRandomString(16),
          itemsOrdered: itemsAddedToCart,
          subTotal: calculateSubtotal(),
          status: "Completed",
          dateAndTime: timeString + "*" + dateString,
        })
      );

      //Show Toast
      toast.success(toastMessages.orderedSuccess);

      //Clear all Cart
      dispatch(removeAllFoodItems());
      setCartItemsData([]);
    } else {
      toast.info(toastMessages.orderCartEmpty);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="bodyContainer">
        <div className="home-title cart-title-container">
          <i className="ts-header-1">Cart.</i>
          <button className="button-type-B" onClick={handleClearCartButton}>
            <img src={DeleteIcon} alt="Clear Cart" title="Clear Cart" />
          </button>
        </div>

        <div className="cartContainer">
          <div className="cartItemsContainer">
            {itemsAddedToCart.length === 0 ? (
              <i className="ts-type-bold-3 color-black-1">No items in the cart</i>
            ) : (
              itemsAddedToCart.map((item: FoodItem) => (
                <CartItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  category={item.category}
                  imgSRC={item.imgSRC}
                  alt={item.name}
                  onChangeQuantity={handleCartItemQuantityChange}
                />
              ))
            )}
          </div>
          <div className="cartSummaryContainer">
            <div>
              <i className="ts-type-bold-2 color-black-3" title="Subtotal">
                Subtotal:&nbsp;&nbsp;
              </i>
              <i className="ts-type-bold-3 color-black-1">${calculateSubtotal()}</i>
            </div>
            <div>
              <i className="ts-type-bold-2 color-black-3" title="Items">
                Items:&nbsp;&nbsp;
              </i>
              <i className="ts-type-bold-3 color-black-1">{itemsAddedToCart.length}</i>
            </div>
          </div>
          <div className="cartButtonContainer">
            <button className="button-type-A" onClick={handleCartSubmitButton} title="Order Items">
              Order Items
            </button>
          </div>
        </div>
        <div className="bg-gra-rect" />
      </div>
    </React.Fragment>
  );
};

export default Cart;
