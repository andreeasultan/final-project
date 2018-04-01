import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Welcome from "./Welcome";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducers";
export const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
import { composeWithDevTools } from "redux-devtools-extension";

const elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

let router = (
    <Provider store={store}>
        <Welcome />
    </Provider>
);

if (location.pathname == "/") {
    router;
} else {
    console.log("redender App");
    router = elem;
}

ReactDOM.render(router, document.querySelector("main"));
