import React from "react";
import ReactDOM from "react-dom"
import store from "../store/store";
import { Provider } from "react-redux";

// import "antd/dist/antd.less";

import Instagram from "./instagram"


ReactDOM.render(
    <Provider store={store}>
        <Instagram />
    </Provider>,
    document.getElementById("root")
);

