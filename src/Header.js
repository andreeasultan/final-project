import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="header">
                <div className="logo-wraper">
                    <img id="logo" src="/lotus.png" alt=""/>
                    <p id="logo-text">treasure reads</p>
                </div>
                <div className="navigation">
                    <input type="text" placeholder="Search a book..." />
                    <div className="magnified-glass">
                        <img src="/search1.png" alt="" />
                    </div>
                    <nav>
                        <Link to="/home">
                            <p>Home</p>
                        </Link>
                        <Link to="/wannaread">
                            <p>Wanna Read</p>
                        </Link>
                        <Link to="/reading-now">
                            <p>Reading Now</p>
                        </Link>
                        <Link to="/read">
                            <p>Read</p>
                        </Link>
                        <a href="/logout"><p>Logout</p></a>
                    </nav>

                </div>
            </div>
        );
    }
}
