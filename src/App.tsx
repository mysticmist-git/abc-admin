import { RouterProvider } from "react-router-dom";
import store from "@/redux/store";
import { Provider } from "react-redux";
import ConfigRouter from "./config/Router";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={ConfigRouter} />
    </Provider>
  );
};

export default App;
