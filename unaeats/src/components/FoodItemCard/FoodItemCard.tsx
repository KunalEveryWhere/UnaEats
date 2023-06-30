import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { addFoodItem, updateFoodItem, FoodItem } from "../../store/foodItemsReducer";
import { RootState } from "../../store/index";

//Styles & Messages
import "./FoodItemCard.css";
import toastMessages from "../../data/toastMessages.json";

//Assets
const AddIcon = require("../../assets/icons/icon-add.png");
const PlaceHolderImage = require("../../assets/images/img-loading.gif");
const ErrorImage = require("../../assets/images/img-error.gif");

export interface FoodItemCardProps {
  // Define the prop types and their required properties
  id: number;
  name: string;
  price: number;
  category: string;
  imgSRC: string;
  alt: string;
}

const FoodItemCard: React.FC<FoodItemCardProps> = (props) => {
  const dispatch = useDispatch();
  const [imgSrc, setSrc] = useState(PlaceHolderImage || props.imgSRC);
  const cartItems = useSelector((state: RootState) => state.foodItem.cartItems || []); //Retrieve all the items stores in 'Cart'. Used for checking

  //This is triggered when a resource (such as an image or a webpage) finishes loading.
  const onLoad = useCallback(() => {
    setSrc(props.imgSRC);
  }, [props.imgSRC]);

  //Whenever Error Occurs
  const onError = useCallback(() => {
    setSrc(ErrorImage || PlaceHolderImage);
  }, []);

  //useEffects
  useEffect(() => {
    //Create a new image blob
    const img = new Image();
    img.src = props.imgSRC as string;

    //Add Event Listeners
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);

    return () => {
      //Handle Image Listeners
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.imgSRC, onLoad]);

  const handleAddToCart = () => {
    //Create a snap for the newItem to be added to Cart
    const newItem: FoodItem = {
      ...props,
      quantity: 1,
      dateAndTime: new Date().toLocaleString(),
    };

    // Check if the item already exists in the cart
    //const existingItem = cartItems.find((item) => item.id === newItem.id);

    // Alternative approach using a loop
    let existingItem = null;
    for (const item of cartItems) {
      if (item.id === newItem.id) {
        existingItem = item;
        break;
      }
    }

    if (existingItem) {
      // If the item exists, update the quantity
      const updatedItem: FoodItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      dispatch(updateFoodItem(updatedItem));
      toast.info(toastMessages.updateItemInCart);
    } else {
      // If the item is unique, add it to the cart
      dispatch(addFoodItem(newItem));

      //Toast
      toast.success(toastMessages.addedToCart);
    }
  };

  return (
    <React.Fragment>
      <div className={props.id === 1 ? "foodItemCard-first foodItemCard" : "foodItemCard"}>
        <div className="imageContainer">
          <img src={imgSrc} alt={props.alt} />
        </div>
        <div className="contentContainer">
          <div className="text-content">
            <i className="ts-type-bold-2">{props.name}</i>
            <i className="ts-type-bold-3">${props.price}</i>
          </div>
          <div className="button-content">
            <button className="round-button-1" onClick={handleAddToCart} data-testid="add-to-cart-button">
              <img src={AddIcon} className="button-icon" alt="Add to Cart" />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FoodItemCard;
