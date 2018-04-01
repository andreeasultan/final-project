
import React from "react";
import { Link } from "react-router-dom";

export default class Footer extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="footer">
                <p>&copy; All rights reserved</p>
            </div>
        );
    }
}
