import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";

//Routes
import Home from "./routes/Home/Home";
import Cart from "./routes/Cart/Cart";
import History from "./routes/History/History";
import PageNotFound from "./routes/PageNotFound/PageNotFound";

//Styles
import "./sharedStyles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/history",
    element: <History />,
  },
]);

//To determine if is a MobileDevice or not
function isMobileDevice() {
  // Return `true` for mobile devices and `false` for web devices
  return window.innerWidth < 768;
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Set position to be on 'top-center' for pc / tab, and 'bottom-center' for mobile
const toastPosition = isMobileDevice() ? "bottom-center" : "top-center";

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position={toastPosition}
        autoClose={800}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  </React.StrictMode>
);
