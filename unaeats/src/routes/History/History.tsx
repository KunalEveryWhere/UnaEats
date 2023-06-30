import React from "react";
import { toast } from "react-toastify";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { removeAllHistoryItems, OrderHistoryItem } from "../../store/foodItemsReducer";

//Styles & Messages
import "./History.css";
import toastMessages from "../../data/toastMessages.json";

//Components
import Header from "../../components/Header/Header";
import HistoryItemCard from "../../components/HistoryItemCard/HistoryItemCard";

const History: React.FC = () => {
  const dispatch = useDispatch();
  const historyOfOrders = useSelector((state: RootState) => state.foodItem.historyOfOrders);

  //To clear all items from history
  const handleClearHistoryButton = () => {
    if (historyOfOrders.length > 0) {
      dispatch(removeAllHistoryItems());
      //Toast
      toast.success(toastMessages.clearHistory);
    } else {
      toast.info(toastMessages.clearHistoryEmpty);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="bodyContainer">
        <div className="home-title cart-title-container">
          <i className="ts-header-1">History.</i>
        </div>

        <div className="historyContainer">
          <div className="historyItemsContainer">
            {historyOfOrders.length === 0 ? (
              <i className="ts-type-bold-3 color-black-1">You haven't ordered anything yet.</i>
            ) : (
              historyOfOrders.map((item: OrderHistoryItem) => (
                <HistoryItemCard
                  itemsOrdered={item.itemsOrdered}
                  subTotal={item.subTotal}
                  status={item.status}
                  dateAndTime={item.dateAndTime}
                  historyID={item.historyID}
                />
              ))
            )}
          </div>
        </div>
        <button className="button-type-A bg-color-white" onClick={handleClearHistoryButton}>
          Clear History
        </button>
        <div className="bg-gra-rect" />
      </div>
    </React.Fragment>
  );
};

export default History;
