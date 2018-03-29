import React from "react";
import Registration from "./Registration";
import { Link, Route, HashRouter } from "react-router-dom";

export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <div>
                        <h1>Hello</h1>
                        <Route exact path="/" component={Registration}></Route>
                    </div>
                </HashRouter>
            </div>
        );
    }
}
