import React from "react";
import { connect } from "react-redux";

class WannaRead extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="content-wraper">
                <p>Wanna REad</p>
            </div>
        );
    }
}
export default connect()(WannaRead);
