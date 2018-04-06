import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser, handleRegistration } from "./actions";

class Registration extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log("this.props", this.props);
        if (!this.props) {
            return null;
        }
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
                        <h3>New to treasure reads? Register now!</h3>
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
                                type="text"
                                name="firstname"
                                placeholder="First Name"
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
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
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
                                type="text"
                                name="email"
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
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.dispatch(
                                        registerUser(this.props)
                                    );
                                }}
                            >
                                Sign Up
                            </button>
                        </form>
                        <h4 className="redirect">
                            Already a member? Please
                            <Link to="/login"> log in</Link>
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        firstname: state.firstname,
        lastname: state.lastname,
        email: state.email,
        password: state.password
    };
};
export default connect(mapStateToProps)(Registration);
