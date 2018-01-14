import React from "react";
import ReactDOM from "react-dom"
import Nav from "./nav";
import store from "../store/store";
import { Provider } from "react-redux";
import "./styles/index.less"


ReactDOM.render(
    <Provider store={store}>
        <Nav />
    </Provider>,
    document.getElementById("root")
);
