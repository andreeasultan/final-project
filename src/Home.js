import React from "react";
import { connect } from "react-redux";
import { getInspirationQuote, getMotivationQuote } from "./actions";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.renderQuote = this.renderQuote.bind(this);
    }
    renderQuote() {
        if (!this.props.quoteObj) {
            return (
                <div>
                    <h3>"If you only read the books that everyone else is reading, you can only think what everyone else is thinking."</h3>
                    <h4><em>Haruki Murakami</em></h4>
                </div>
            );
        } else {
            return (
                <div>
                    <h3>"{this.props.quoteObj.quote}"</h3>
                    <h4><em>{this.props.quoteObj.author}</em></h4>
                </div>
            );
        }
    }
    render() {
        if (!this.props) {
            console.log("no props", this.props);
            return null;
        }
        console.log("this.props.quoteObj", this.props);
        return (
            <div className="content-wraper">
                <div className="card-background">
                    <div className="card-foreground">
                        <img src="/inspiration.png" alt="" />
                    </div>
                    <p>INSPIRATION</p>
                </div>
                <div className="greeting">
                    <h2>Welcome, Andreea!</h2>
                </div>
                <div className="quote">{this.renderQuote()}</div>
                <div className="quote-generator">
                    <button
                        onClick={() => {
                            console.log("clicking");
                            this.props.dispatch(getInspirationQuote());
                        }}
                    >
                        INSPIRATION
                    </button>
                    <p>CHOOSE YOUR DOSE OF:</p>
                    <button
                        onClick={() =>
                            this.props.dispatch(getMotivationQuote())
                        }
                    >
                        MOTIVATION
                    </button>
                </div>
                <div className="separator" />
                <div className="recent">
                    <h4>RECENT ACTIVITY</h4>
                    <div className="activity">
                        <p>
                            Lorem Ipsum is placeholder text commonly used in the
                            graphic, print, and publishing industries for
                            previewing layouts and visual mockups
                        </p>
                    </div>
                    <div className="activity">
                        <p>
                            Lorem Ipsum is placeholder text commonly used in the
                            graphic, print, and publishing industries for
                            previewing layouts and visual mockups
                        </p>
                    </div>
                    <div className="activity">
                        <p>
                            Lorem Ipsum is placeholder text commonly used in the
                            graphic, print, and publishing industries for
                            previewing layouts and visual mockups;
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log("state inside Home component", state);
    return {
        quoteObj: state.quote,
        registeredUser: state.registeredUser,
    };
};
export default connect(mapStateToProps)(Home);
