import React from "react";
import { connect } from "react-redux";
import { finishReadingBook, showNotesUploader } from "./actions";
import Notes from "./Notes";

class Reading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.books) {
            return null;
        }
        const listOfReadingBooks = this.props.books.map(book => {
            if (book.status == 2) {
                return (
                    <div>
                        <div className="book" key={book.id}>
                            <p>
                                {book.title}, {book.author}
                            </p>
                            <button
                                onClick={() => {
                                    this.props.dispatch(
                                        showNotesUploader(book.id)
                                    );
                                }}
                            >
                                Notes
                            </button>

                            <button
                                onClick={() => {
                                    this.props.dispatch(
                                        finishReadingBook({ book })
                                    );
                                }}
                            >
                                Finish
                            </button>
                        </div>
                        {book.showNotesUploader && <Notes book={book} />}
                    </div>
                );
            }
        });
        return (
            <div className="reading-wraper">
                <h2>Books you are currently reading:</h2>
                {listOfReadingBooks}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        books: state.books
    };
};
export default connect(mapStateToProps)(Reading);
