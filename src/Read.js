import React from "react";
import { connect } from "react-redux";
import { showDetailsUploader } from "./actions";
import Details from "./Details";

class Read extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.books) {
            return null;
        }
        const listOfFinishedBooks = this.props.books.map(book => {
            if (book.status == 3) {
                return (
                    <div>
                        <div className="book" key={book.id}>
                            <p>
                                {book.title}, by {book.author}
                            </p>
                            <button
                                onClick={() => {
                                    this.props.dispatch(
                                        showDetailsUploader(book.id)
                                    );
                                }}
                            >
                                Details
                            </button>
                        </div>
                        {book.showDetailsUploader && (
                            <Details book={book} />
                        )}
                    </div>
                );
            }
        });
        return (
            <div className="reading-wraper">
                <h2>Books you read:</h2>
                {listOfFinishedBooks}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        books: state.books
    };
};
export default connect(mapStateToProps)(Read);
