import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import WannaRead from "./WannaRead";
import Reading from "./Reading";
import Read from "./Read";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getBooks, getUserInfo } from "./actions";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(getBooks());
        this.props.dispatch(getUserInfo());
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className="wraper">
                        <Header />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/wannaread" component={WannaRead} />
                        <Route exact path="/reading-now" component={Reading} />
                        <Route exact path="/read" component={Read} />
                        <Footer/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null)(App);
