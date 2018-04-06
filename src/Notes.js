import React from "react";
import { connect } from "react-redux";
import { getNotes, saveNote, getNoteValue, closeNotesUploader } from "./actions";

class Notes extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(getNotes(this.props.book.id));
    }
    render() {
        if (!this.props.notes) {
            return null;
        }
        const myNotes = this.props.notes.map(note => {
            if(note.book_id == this.props.book.id) {
                return (
                    <div className="note"key={note.id}>
                        <div className="note-text">
                            <p>{note.note}</p>
                            <p id="note-date">added on: {note.to_char}</p>
                        </div>
                        <div className="change-note">
                            <img src="/edit.png" alt=""/>
                            <img src="/delete.png" alt=""/>
                        </div>
                    </div>
                );
            }
        });
        return (
            <div className="notes-container">
                <button onClick={()=>this.props.dispatch(closeNotesUploader(this.props.book.id))} className="close">x</button>
                <p>ADD A NOTE:</p>
                <div className="take-notes">
                    <textarea id="notepad"
                        onChange={e => {
                            this.props.dispatch(
                                getNoteValue(this.props.book.id, e.target.value)
                            );
                        }}
                        name="note"
                    />
                    <button onClick={()=>{this.props.dispatch(saveNote(this.props.book.id, this.props.book.prospectiveNote))}}>Save</button>
                </div>
                <p>YOUR NOTES:</p>
                {myNotes}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        books: state.books
    };
};

export default connect(mapStateToProps)(Notes);
