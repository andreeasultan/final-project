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
                    <h3>
                        "If you only read the books that everyone else is
                        reading, you can only think what everyone else is
                        thinking."
                    </h3>
                    <h4>
                        <em>Haruki Murakami</em>
                    </h4>
                </div>
            );
        } else {
            return (
                <div>
                    <h3>"{this.props.quoteObj.quote}"</h3>
                    <h4>
                        <em>{this.props.quoteObj.author}</em>
                    </h4>
                </div>
            );
        }
    }
    render() {
        if (!this.props || !this.props.user) {
            return null;
        }

        return (
            <div className="content-wraper">
                <div className="card-background">
                    <div className="card-foreground">
                        <img
                            src={
                                this.props.quoteObj.type === "inspiration"
                                    ? "/inspiration.png"
                                    : "/motivation.png"
                            }
                            alt=""
                        />
                    </div>
                    <p>{this.props.quoteObj.type.toUpperCase()}</p>
                </div>
                <div className="greeting">
                    <h2>Welcome, {this.props.user.firstname}!</h2>
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
                        <h4>FINISHED A BOOK:</h4>
                        <p>Why We Sleep: Unlocking the Power of Sleep and Dreams</p>
                        <p>By Matthew Walker, PhD</p>
                    </div>
                    <div className="activity">
                        <h4>ADDED A NOTE:</h4>
                        <p>On book: Leonardo da Vinci</p>
                    </div>
                    <div className="activity">
                        <h4>ADDED A BOOK:</h4>
                        <p>Genghis Khan and the Making of the Modern World</p>
                        <p>By Jack Weatherford</p>
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
        user: state.user
    };
};
export default connect(mapStateToProps)(Home);
