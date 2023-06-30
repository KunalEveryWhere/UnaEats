import React, { useState, Suspense, useEffect, lazy } from "react";

//Components
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";

//Styles
import "./Home.css";
import "react-toastify/dist/ReactToastify.css";

//Data (to simulate a server)
import foodData from "../../data/foodData.json";
import popularItemsData from "../../data/popularItemsData.json";

//Assets
const AllCatIcon = require("../../assets/icons/icon-allcategory.png");
const RiceAndNoodlesIcon = require("../../assets/icons/icon-rice&noodles.png");
const FastFoodIcon = require("../../assets/icons/icon-fastfood.png");
const BeveragesIcon = require("../../assets/icons/icon-beverages.png");

//Slow-Loading Image Component
const FoodItemCard = lazy(() => import("../../components/FoodItemCard/FoodItemCard"));
const PopularItemCard = lazy(() => import("../../components/PopularItemCard/PopularItemCard"));
const timeDelay = 300;

//Interface for Category
interface Category {
  id: number;
  name: string;
  isActive: boolean;
  imgSRC: any;
  altText: string;
}

//Interface & Object containing all information from Server, with food-items
interface FoodItems {
  id: number;
  name: string;
  price: number;
  category: string;
  imgSRC: string;
  alt: string;
}

//This function is used to simulate that the FoodData is coming from server
const fetchFoodData = (): Promise<FoodItems[]> => {
  return new Promise((resolve) => {
    // Simulate an asynchronous delay
    setTimeout(() => {
      resolve(foodData);
    }, timeDelay); // Simulate a 1-second delay
  });
};

//This function is used to simulate that the PopularItems is coming from server
const fetchPopularItemsData = (): Promise<FoodItems[]> => {
  return new Promise((resolve) => {
    // Simulate an asynchronous delay
    setTimeout(() => {
      resolve(popularItemsData);
    }, timeDelay); // Simulate a 1-second delay
  });
};

const Home: React.FC = () => {
  //Initializing Categories for Button Mapping
  const initialCategories: Category[] = [
    { id: 1, name: "All Categories", isActive: false, imgSRC: AllCatIcon, altText: "All Category Icon" },
    { id: 2, name: "Rice & Noodles", isActive: false, imgSRC: RiceAndNoodlesIcon, altText: "Rice & Noodles Icon" },
    { id: 3, name: "Fast Food", isActive: false, imgSRC: FastFoodIcon, altText: "Fast Food Icon" },
    { id: 4, name: "Beverages", isActive: false, imgSRC: BeveragesIcon, altText: "Beverages Icon" },
  ];

  //Set Categories, Filter and Data from Server & Loading
  const [categories, setCategories] = useState(initialCategories);
  const [filterID, setFilterID] = useState(1);
  const [foodItemsFromServer, setFoodItemsFromServer] = useState<FoodItems[]>([]);
  const [popularItemsFromServer, setPopularItemsFromServer] = useState<FoodItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Code to initialize the selected category when the component is first rendered
  useEffect(() => {
    //This function is used to simulate that the FoodData is coming from server
    const fetchData = async () => {
      // Set isLoading to true before fetching data
      setIsLoading(true);
      try {
        // Simulate fetching data from a server
        const response1 = await fetchFoodData();
        setFoodItemsFromServer(response1);

        const response2 = await fetchPopularItemsData();
        setPopularItemsFromServer(response2);

        //Set isLoading = False
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    //Call the function
    fetchData();

    //By default, "All Categories" button will be pressed.
    handleCategoryClick(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //onClick Handler
  const handleCategoryClick = (id: number) => {
    //Change the isActive for the button that was clicked
    const updatedCategories = categories.map((category) => {
      if (category.id === id) {
        setFilterID(id);
        return { ...category, isActive: true };
      } else {
        return { ...category, isActive: false };
      }
    });

    //Update the State
    setCategories(updatedCategories);
  };

  //Extract the filterName that the user clicked
  const filterName = initialCategories[filterID - 1].name;
  //Update the filteredFoodItem List
  const filteredFoodItems =
    filterID === 1 ? foodItemsFromServer : foodItemsFromServer.filter((item) => item.category === filterName);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Header />
          <div className="bodyContainer">
            <div className="home-title">
              <i className="ts-header-1">DELICIOUS FOOD</i>
              <i className="ts-type-regular-1">AT YOUR DOOR STEPS.</i>
            </div>
            <div className="categoryContainer">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={category.isActive ? "categoryButton categoryButton-active" : "categoryButton"}
                  title={category.name}
                >
                  <img src={category.imgSRC} className="category-icon" alt={category.altText} />
                </button>
              ))}
            </div>
            <div className="foodItemDiv">
              {filteredFoodItems.map((foodItem) => (
                <Suspense key={foodItem.id} fallback={<Loading />}>
                  <FoodItemCard
                    id={foodItem.id}
                    name={foodItem.name}
                    price={foodItem.price}
                    category={foodItem.category}
                    imgSRC={foodItem.imgSRC}
                    alt={foodItem.alt}
                  />
                </Suspense>
              ))}
            </div>
            <div className="popularItemDiv">
              <div className="popular-items-title">
                <i className="ts-header-1">Popular&nbsp;</i>
                <i className="ts-type-regular-1 font-size-32">Items</i>
              </div>
              <div className="popular-items-cards">
                {popularItemsFromServer.map((foodItem) => (
                  <Suspense key={foodItem.id} fallback={<Loading />}>
                    <PopularItemCard
                      id={foodItem.id}
                      name={foodItem.name}
                      price={foodItem.price}
                      category={foodItem.category}
                      imgSRC={foodItem.imgSRC}
                      alt={foodItem.alt}
                    />
                  </Suspense>
                ))}
              </div>
            </div>
            <div className="bg-gra-rect" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
