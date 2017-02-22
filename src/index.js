import React from "react";
import {render} from "react-dom";

import App from "./components/app.jsx";
import Cart from "./components/cart.jsx";
import Products from "./components/products.jsx";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
// Stylesheet: Material Design Lite
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
//import our stylesheet so webpack puts it into the bundle
import "./css/main.css";
export var cartCount = 0;
//TODO: replace the JSX here with a Router configuration
//from the react router module (already a dependency in package.json)
var router = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            // IndexRoute is shown by default if given an invalid URL
            <IndexRoute component={Products}></IndexRoute>
            <Route path="/cart" component={Cart}></Route>
        </Route>
    </Router>
);

render(router, document.getElementById("app"));
