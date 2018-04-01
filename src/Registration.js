import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser, handleRegistration } from "./actions";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     firstname: "",
        //     lastname: "",
        //     email: "",
        //     password: ""
        // };
        // this.handleRegistration = this.handleRegistration.bind(this);
    }
    // handleRegistration(e) {
    //     (this.setSate = {
    //         [e.target.name]: e.target.value
    //     }),
    //     () => console.log("new state", this.state);
    // }
    render() {
        const firstname = this.props.newUser.firstname;
        const lastname = this.props.newUser.lastname;
        const email = this.props.newUser.email;
        const password = this.props.newUser.password;

        console.log("rendering");
        // if (!firstname || !lastname || !email || !password) {
        //     console.log("rendering null");
        //     return null;
        // }
        return (
            <div>
                <div className="header">
                    <img src="/my-books.png" alt="" />
                </div>
                <div className="wraper-registration">
                    <div className="description">
                        <h2>A place where my books feel at home.</h2>
                        <p>
                            Save interesting tittles | Take notes while reading
                            | Return anytime to get inspiration.
                        </p>
                    </div>
                    <div className="registration-form">
                        <h3>New to treasure reads? Register now!</h3>
                        <form>
                            <input onChange={this.props.dispatch(handleRegistration())} type="text" placeholder="First Name"/>
                            <input onChange={this.props.dispatch(handleRegistration())} type="text" placeholder="Last Name"/>
                            <input onChange={this.props.dispatch(handleRegistration())} type="text" placeholder="Email Address"/>
                            <input onChange={this.props.dispatch(handleRegistration())} type="text" placeholder="Password"/>
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.dispatch(
                                        registerUser(this.state)
                                    );
                                }}
                            >
                                Sign Up
                            </button>
                        </form>
                        <h4 className="redirect">
                            Already a member? Please
                            <Link to="/login">log in</Link>
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log("hello world", state);
    return {
        newUser: state.newUser || []
    };
};
export default connect(mapStateToProps)(Registration);



// <input
//     onChange={this.handleRegistration}
//     name="firstname"
//     type="text"
//     placeholder="First Name"
// />
// <input
//     onChange={this.handleRegistration}
//     name="lastname"
//     type="text"
//     placeholder="Last Name"
// />
// <input
//     onChange={this.handleRegistration}
//     name="email"
//     type="text"
//     placeholder="Email Address"
// />
// <input
//     onChange={this.handleRegistration}
//     name="password"
//     type="text"
//     placeholder="Password"
// />
