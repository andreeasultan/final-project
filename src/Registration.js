import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Registration extends React.Component {
    render() {
        return (
            <div className="registration">
                <h2>I am registering</h2>
                <input type="text" placeholder="First Name" />
            </div>
        );
    }
}

export default connect()(Registration);
