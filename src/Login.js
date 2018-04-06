import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleRegistration, loginUser } from "./actions";

class Registration extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props) {
            return null;
        }
        console.log("this.props", this.props);
        return (
            <div>
                <div className="header">
                    <div>
                        <img id="logo" src="/lotus.png" alt="" />
                        <p id="logo-text">treasure reads</p>
                    </div>
                </div>
                <div className="wraper-registration">
                    <div className="description">
                        <h2>A place where your books feel at home.</h2>
                        <p>
                            Save interesting tittles | Take notes while reading
                            | Return anytime to get inspiration.
                        </p>
                    </div>
                    <div className="registration-form">
                        <h3>Two steps away from treasure reads:</h3>
                        <form>
                            <input
                                onChange={e => {
                                    this.props.dispatch(
                                        handleRegistration(
                                            e.target.name,
                                            e.target.value
                                        )
                                    );
                                }}
                                name="email"
                                type="text"
                                placeholder="Email Address"
                            />
                            <input
                                onChange={e => {
                                    this.props.dispatch(
                                        handleRegistration(
                                            e.target.name,
                                            e.target.value
                                        )
                                    );
                                }}
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.dispatch(
                                        loginUser(this.props)
                                    );
                                }}
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log("state", state);
    return {
        email: state.email,
        password: state.password
    };
};
export default connect(mapStateToProps)(Registration);
