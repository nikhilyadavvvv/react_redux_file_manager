import React from "react";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import devTools from "devtools-detect";
import store from "./redux/store";
import persistStore from "redux-persist/es/persistStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
