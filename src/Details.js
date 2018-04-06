import React from "react";
import { connect } from "react-redux";
import { getNotes, closeDetailsUploader } from "./actions";

class Details extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.dispatch(getNotes(this.props.book.id))
    }
    render() {
        if (!this.props.notes) {
            return null;
        }
        const details = this.props.notes.map(note => {
            if (note.book_id == this.props.book.id) {
                return (
                    <div className= "details">
                        <p>{note.note}</p>
                        <p id="note-date">added on: {note.to_char}</p>
                    </div>
                );
            }
        });

        return (
            <div className="details-container">
                <button onClick={()=>this.props.dispatch(closeDetailsUploader(this.props.book.id))} className="close">x</button>
                <p className="date">BOOK FINISHED ON: {this.props.book.to_char} </p>
                <p>YOUR NOTES:</p>
                {details}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        books: state.books,
        notes: state.notes
    };
};
export default connect(mapStateToProps)(Details);
