import React from "react";
import { connect } from "react-redux";

class Reading extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="content-wraper">
                <p>Reading</p>
            </div>
        );
    }
}
export default connect()(Reading);
