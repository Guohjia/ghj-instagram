import React from "react";
import ReactDOM from "react-dom"
import { Counter } from "./cpt_1";
import {store} from "../store/store"
import { Provider} from "react-redux"


ReactDOM.render(
    <Provider store={store}>
        <Counter />
    </Provider>,
    document.getElementById("root")
);
