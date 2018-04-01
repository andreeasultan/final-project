import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import WannaRead from "./WannaRead"
import Reading from "./Reading";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        console.log("render wannaread");
        return(
            <div>
                <BrowserRouter>
                    <div className="wraper">
                        <Header />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/wannaread" component={WannaRead} />

                        <Footer />
                    </div>
                </BrowserRouter>
            </div>
        );

    }
}
