import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "./actions";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        };
        this.handleRegistration = this.handleRegistration.bind(this);
    }
    handleRegistration(e) {
        (this.setSate = {
            [e.target.name]: e.target.value
        }),
        () => console.log("new state", this.state);
    }
    render() {
        // const firstname = this.props.newUser.firstname;
        // const lastname = this.props.newUser.lastname;
        // const email = this.props.newUser.email;
        // const password = this.props.newUser.password;
        //
        // if(!firstname || !lastname || !email || !password) {
        //     return null;
        // }

        return (
            <div>
                <div className="header">
                    <img src="/my-books.png" alt=""/>
                </div>
                <div className="wraper-registration">
                    <div className="description">
                        <h2>A place where my books feel at home.</h2>
                        <p>Save interesting tittles | Take notes while reading | Return anytime to get inspiration.</p>
                    </div>
                    <div className="registration-form">
                        <h3>Few steps to access my books:</h3>
                        <form>

                            <input
                                onChange={this.handleRegistration}
                                name="email"
                                type="text"
                                placeholder="Email Address"
                            />
                            <input
                                onChange={this.handleRegistration}
                                name="password"
                                type="text"
                                placeholder="Password"
                            />
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.dispatch(
                                        registerUser(this.state)
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
// const mapStateToProps = state => {
//     console.log("state", state);
//     return {
//         newUser: state.newUser || []
//     };
// };
export default connect()(Registration);
