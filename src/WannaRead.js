import React from "react";
import { connect } from "react-redux";
import { getBookData, addBook, getBooksToRead, startReading } from "./actions";
// import {reset} from "redux-form";


class WannaRead extends React.Component {
    constructor(props) {
        super(props);
    }
    // componentDidMount() {
    //     this.props.dispatch(getBooksToRead());
    // }
    render() {
        console.log("this.props", this.props);
        if (!this.props.books) {
            return null;
        }
        const booksToRead = this.props.books.map(book => {
            if (book.status == 1) {
                return (
                    <div className="book" key={book.id}>
                        <p> {book.title}, by {book.author} </p>
                        <button
                            onClick={() => {
                                this.props.dispatch(startReading({ book }));
                            }}
                        >
                            Start
                        </button>
                    </div>
                );
            }
        });
        return (
            <div className="wanna-read-wraper">
                <div className="add-a-book">
                    <h2>Add a book you'd like to read:</h2>
                    <form onSubmit={()=>this.props.dispatch.reset("add")} name="add">
                        <input id="input-one"
                            onChange={e => {
                                this.props.dispatch(
                                    getBookData(e.target.name, e.target.value)
                                );
                            }}
                            type="text"
                            name="title"
                            placeholder="Title"
                        />
                        <input id="input-two"
                            onChange={e => {
                                this.props.dispatch(
                                    getBookData(e.target.name, e.target.value)
                                );
                            }}
                            type="text"
                            name="author"
                            placeholder="Author"
                        />
                        <button
                            onClick={e => {
                                e.preventDefault();
                                this.props.dispatch(addBook(this.props));
                            }}
                        >
                            Add
                        </button>
                    </form>
                </div>
                <div className="books-to-read">
                    <h2>Your reading list:</h2>
                    {booksToRead}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        title: state.title,
        author: state.author,
        book: state.addedBook,
        books: state.books,
        readingBook: state.readingBook
    };
};
export default connect(mapStateToProps)(WannaRead);
