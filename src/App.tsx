import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import store from "@/redux/store";

import ConfigRouter from "./config/Router";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={ConfigRouter} />
      <ToastContainer />
    </Provider>
  );
};

export default App;
