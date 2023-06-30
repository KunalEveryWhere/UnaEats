import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

//Redux
import { useDispatch } from "react-redux";
import { removeFoodItem } from "../../store/foodItemsReducer";

//Styles & Messages
import "./CartItemCard.css";
import toastMessages from "../../data/toastMessages.json";

//Assets
const IncreIcon = require("../../assets/icons/icon-incre.png");
const DecreIcon = require("../../assets/icons/icon-decre.png");
const DeleteIcon = require("../../assets/icons/icon-delete.png");
const PlaceHolderImage = require("../../assets/images/img-loading.gif");
const ErrorImage = require("../../assets/images/img-error.gif");

export interface CartItemCardProps {
  // Define the prop types and their required properties
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  imgSRC: string;
  alt: string;
  onChangeQuantity: (cartItemData: CartItemCardProps) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = (props) => {
  const [imgSrc, setSrc] = useState(PlaceHolderImage || props.imgSRC);
  const [quantity, setQuantity] = useState(props.quantity);
  const dispatch = useDispatch();

  //This is triggered when a resource (such as an image or a webpage) finishes loading.
  const onLoad = useCallback(() => {
    setSrc(props.imgSRC);
  }, [props.imgSRC]);

  //If an Error
  const onError = useCallback(() => {
    setSrc(ErrorImage || PlaceHolderImage);
  }, []);

  //UseEffect
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

  //Handle increment value
  const handleIncreQuantityClick = () => {
    const newQuantity = quantity + 1; //Update the quantity
    props.onChangeQuantity({ ...props, quantity: newQuantity });
    setQuantity(newQuantity); //Update the state at the component level
  };

  //Handle decrement value
  const handleDecreQuantityClick = () => {
    if (quantity === 1) {
      dispatch(removeFoodItem(props.id));
      //Toast
      toast.success(toastMessages.cartRemove);
    }
    const newQuantity = Math.max(quantity - 1, 0);
    props.onChangeQuantity({ ...props, quantity: newQuantity });
    setQuantity(newQuantity); //Update the state at the component level
  };

  return (
    <React.Fragment>
      <div className="CartItemCard" title={props.name}>
        <div className="cartImageContainer">
          <img src={imgSrc} alt={props.alt} />
        </div>
        <div className="cartContentContainer">
          <div className="nameDiv">
            <i className="ts-type-bold-1">{props.name}</i>
            <i className="ts-type-subtitle-1">{props.category}</i>
          </div>
          <i className="ts-type-bold-4">${props.price}</i>
        </div>
        <div className="buttonsContainer">
          <button
            className={`incre-decre-buttons ${quantity === 1 ? "deleteColor" : "decreColor"}`}
            onClick={handleDecreQuantityClick}
          >
            {quantity === 1 ? (
              <img src={DeleteIcon} className="alt" alt="Delete Item" />
            ) : (
              <img src={DecreIcon} className="alt" alt="Reduce Quantity" />
            )}
          </button>
          <i className="ts-type-bold-3">{quantity}</i>
          <button className="incre-decre-buttons increColor" onClick={handleIncreQuantityClick}>
            <img src={IncreIcon} alt="Increase Quantity" />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartItemCard;
