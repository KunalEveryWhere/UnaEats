import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { addFoodItem, updateFoodItem, FoodItem } from "../../store/foodItemsReducer";
import { RootState } from "../../store/index";

//Styles & Messages
import "./PopularItemCard.css";
import toastMessages from "../../data/toastMessages.json";

//Assets
const MoreIcon = require("../../assets/icons/icon-more.png");
const PlaceHolderImage = require("../../assets/images/img-loading.gif");
const ErrorImage = require("../../assets/images/img-error.gif");

//Interface for Popular Item Card
export interface PopularItemCardInterface {
  // Define the prop types and their required properties
  id: number;
  name: string;
  price: number;
  category: string;
  imgSRC: string;
  alt: string;
}

const PopularItemCard: React.FC<PopularItemCardInterface> = (props) => {
  const dispatch = useDispatch();
  const [imgSrc, setSrc] = useState(PlaceHolderImage || props.imgSRC);
  const cartItems = useSelector((state: RootState) => state.foodItem.cartItems); //Retrieve all the items stores in 'Cart'. Used for checking

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
    const existingItem = cartItems.find((item) => item.id === newItem.id);

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
      <div className="popular-item-container">
        <div className="popular-image-container">
          <img src={imgSrc} alt={props.alt} title={props.alt} />
        </div>
        <div className="popular-item-content">
          <i className="ts-type-bold-1 font-size-sm name-truncate">{props.name}</i>
          <i className="ts-type-subtitle-1 margin-top-n14">{props.category}</i>
          <i className="ts-type-bold-3">${props.price}</i>
        </div>
        <button
          className="button-type-B button-size-60 bg-color-black-2"
          onClick={handleAddToCart}
          title="Add to Cart"
          data-testid="Add to Cart"
        >
          <img src={MoreIcon} alt="Add to Cart Icon" />
        </button>
      </div>
    </React.Fragment>
  );
};

export default PopularItemCard;
