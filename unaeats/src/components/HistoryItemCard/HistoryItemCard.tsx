import React from "react";

//Styles
import "./HistoryItemCard.css";

//Components
import HistoryInnerFoodItemCard from "../HistoryInnerFoodItemCard/HistoryInnerFoodItemCard";
import { FoodItem } from "../../store/foodItemsReducer";

//Interface for History Card
export interface HistoryItemCardProps {
  historyID: string;
  itemsOrdered: FoodItem[];
  subTotal: number;
  status: string;
  dateAndTime: string;
}

const HistoryItemCard: React.FC<HistoryItemCardProps> = (props) => {
  return (
    <React.Fragment>
      <div className="outerDiv" key={props.historyID}>
        <div className="history-item-card-container">
          <div className="history-item-status">
            <i className="ts-type-subtitle-1 color-black-3">
              {props.dateAndTime.split("*")[0]}&nbsp;&nbsp;|&nbsp;&nbsp;{props.dateAndTime.split("*")[1]}
            </i>
            <div className="history-item-status-right">
              <i className="ts-type-subtitle-1 color-black-3">{props.status}</i>
              <i className="ts-type-subtitle-1 color-black-3">ID:&nbsp;&nbsp;{props.historyID}</i>
            </div>
          </div>
          <div className="history-inner-food-items" key={props.historyID}>
            {props.itemsOrdered.map((item: FoodItem) => (
              <HistoryInnerFoodItemCard
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                category={item.category}
              />
            ))}
          </div>
          <div className="history-summary">
            <div className="history-summary-text">
              <i className="ts-type-bold-2 color-black-3">Subtotal:</i>
              <i className="ts-type-subtitle-1 color-black-3">Items: {props.itemsOrdered.length}</i>
            </div>
            <i className="ts-header-1 color-black-2">${props.subTotal}</i>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HistoryItemCard;
