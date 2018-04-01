import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="content-wraper">
                <div className="card-background">
                    <div className="card-foreground">
                        <img src="/inspiration.png" alt=""/>
                    </div>
                    <p>INSPIRATION</p>
                </div>
                <div className="greeting">
                    <h2>Welcome, Andreea!</h2>
                </div>
                <div className="quote">
                    <h3>Lorem Ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups</h3>
                </div>
                <div className="quote-generator">
                    <button>INSPIRATION</button>
                    <p>CHOOSE YOUR DOSE OF:</p>
                    <button>MOTIVATION</button>
                </div>
                <div className="separator"></div>
                <div className="recent">
                    <h4>RECENT ACTIVITY</h4>
                    <div className="activity">
                        <p>Lorem Ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups</p>
                    </div>
                    <div class="activity">
                        <p>Lorem Ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups</p>
                    </div>
                    <div class="activity">
                        <p>Lorem Ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups</p>
                    </div>

                </div>
            </div>
        );
    }
}
export default connect()(Home);
