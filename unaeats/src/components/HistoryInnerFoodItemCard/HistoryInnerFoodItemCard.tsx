import React from "react";

//Styles
import "./HistoryInnerFoodItemCard.css";

interface HistoryInnerFoodItemCardProps {
  // Define the prop types and their required properties
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const HistoryInnerFoodItemCard: React.FC<HistoryInnerFoodItemCardProps> = (props) => {
  return (
    <React.Fragment>
      <div className="history-inner-item-container" key={props.name}>
        <div className="hiic-text-content">
          <div className="hicc-item-details">
            <i className="ts-type-bold-1 color-black-2">{props.name}</i>
            <i className="ts-type-subtitle-1 color-black-3">
              {props.quantity}&nbsp;&nbsp;|&nbsp;&nbsp;{props.category}
            </i>
          </div>
          <div className="hiic-item-price">
            <i className="ts-type-bold-3 color-black-2">${props.price * props.quantity}</i>
          </div>
        </div>
        <hr className="hiic--line" />
      </div>
    </React.Fragment>
  );
};

export default HistoryInnerFoodItemCard;
