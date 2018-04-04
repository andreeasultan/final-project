import React from "react";
import { connect } from "react-redux";

class Read extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(!this.props.books){
            return null;
        }
        const listOfFinishedBooks = this.props.books.map(book=>{
            if(book.status==3){
                return(
                    <div className="book" key={book.id}>
                        <img src="/magnolia.png" alt=""/>
                        <p>{book.title}, {book.author}</p>
                        <button>Details</button>
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
