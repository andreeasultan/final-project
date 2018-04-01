import React from "react";
import Registration from "./Registration";
import Login from "./Login";
import { Link, Route, HashRouter } from "react-router-dom";

export default class Welcome extends React.Component {
    render() {
        console.log("inside Welcome");
        return (
            <div>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration}></Route>
                        <Route exact path="/login" component={Login}></Route>
                    </div>
                </HashRouter>
            </div>
        );
    }
}
