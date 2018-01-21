import React from "react";
import ReactDOM from "react-dom"
import store from "../store/store";
import { Provider } from "react-redux";
import "./styles/index.less";
import "antd/dist/antd.less";

import Instagram from "./component"


ReactDOM.render(
    <Provider store={store}>
        <Instagram />
    </Provider>,
    document.getElementById("root")
);
