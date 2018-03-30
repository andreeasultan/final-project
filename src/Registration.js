import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleRegistration, registerUser } from "./actions";

class Registration extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const firstname = this.props.newUser.firstname;
        const lastname = this.props.newUser.lastname;
        const email = this.props.newUser.email;
        const password = this.props.newUser.password;

        if(!firstname || !lastname || !email || !password) {
            return null;
        }

        return (
            <div className="registration">
                <h2>New to MyBooks? Register now!</h2>
                <form>
                    <input onChange={this.props.dispatch(handleRegistration())} type="text" placeholder="First Name"/>
                    <input onChange={this.props.dispatch(handleRegistration())} type="text" placeholder="Last Name"/>
                    <input onChange={this.props.dispatch(handleRegistration())} type="text" placeholder="Email Address"/>
                    <input onChange={this.props.dispatch(handleRegistration())} type="text" placeholder="Password"/>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            this.props.dispatch(registerUser(firstname, lastname, email, password));
                        }}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log("state", state);
    return {
        newUser: state.newUser || []
    };
};
export default connect(mapStateToProps)(Registration);
