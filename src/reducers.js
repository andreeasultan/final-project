import React from "react";

var initialState = {
    quote:{
        id: null,
        type: "inspiration",
        quote: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking.",
        author: "Haruki Murakami"
    }
}
export default function(state = initialState, action) {
    if (action.type == "USER_DATA") {
        state = Object.assign({}, state, {
            [action.fieldName]: action.fieldValue
        });
    }
    if (action.type == "REGISTER_USER") {
        state = {
            ...state,
            registeredUser: action.registeredUser
        };
    }
    if (
        action.type == "INSPIRATION_QUOTE" ||
        action.type == "MOTIVATION_QUOTE"
    ) {
        state = {
            ...state,
            quote: action.quote
        };
    }
    if (action.type == "BOOK_DATA") {
        state = {
            ...state,
            [action.fieldName]: action.fieldValue
        };
    }
    if (action.type == "ADD_BOOK") {
        var books = state.books.slice();
        books.unshift(action.addedBook);
        state = {
            ...state,
            books
        };
    }
    if (action.type == "GET_BOOKS") {
        state = {
            ...state,
            books: action.books
        };
    }
    if (action.type == "START_READING") {
        books = state.books.slice();
        books.forEach(book => {
            if (book.id == action.readingBook.id) {
                book.status = 2;
            }
        });
        state = {
            ...state,
            books
        };
    }
    if (action.type == "GET_READING_BOOKS") {
        state = {
            ...state,
            books: action.books
        };
    }

    if (action.type == "FINISH_READING") {
        books = state.books.slice();
        books.forEach(book => {
            if (book.id == action.finishedBook.id) {
                book.status = 3;
            }
        });
        state = {
            ...state,
            books
        };
    }

    if (action.type == "GET_FINISHED_BOOKS") {
        state = {
            ...state,
            books: action.books
        };
    }
    if (action.type == "SHOW_NOTES_UPLOADER") {
        state = {
            ...state,
            books: state.books.map(book => {
                if (book.id == action.bookId) {
                    return {
                        ...book,
                        showNotesUploader: true
                    };
                } else {
                    return book;
                }
            })
        };
    }
    if (action.type == "CLOSE_NOTES_UPLOADER") {
        state = {
            ...state,
            books: state.books.map(book => {
                if (book.id == action.bookId) {
                    return {
                        ...book,
                        showNotesUploader: false
                    };
                } else {
                    return book;
                }
            })
        };
    }

    if (action.type == "GET_NOTE_VALUE") {
        state = {
            ...state,
            books: state.books.map(book => {
                if (book.id == action.bookId) {
                    return {
                        ...book,
                        prospectiveNote: action.fieldValue
                    };
                } else {
                    return book;
                }
            })
        };
    }
    if (action.type == "SAVE_NOTE") {
        var notes = state.notes.slice();
        notes.unshift(action.note);

        state = {
            ...state,
            notes,
            books: state.books.map(book => {
                if (book.id == action.bookId) {
                    return {
                        ...book,
                        prospectiveNote: null
                    };
                } else {
                    return book;
                }
            })
        };
    }

    if (action.type == "GET_NOTES") {
        state = {
            ...state,
            notes: action.notes || []
        };
    }

    if (action.type == "SHOW_DETAILS_UPLOADER") {
        state = {
            ...state,
            books: state.books.map(book => {
                if (book.id == action.bookId) {
                    return {
                        ...book,
                        showDetailsUploader: true
                    };
                } else {
                    return book;
                }
            })
        };
    }
    if (action.type == "CLOSE_DETAILS_UPLOADER") {
        state = {
            ...state,
            books: state.books.map(book => {
                if (book.id == action.bookId) {
                    return {
                        ...book,
                        showDetailsUploader: false
                    };
                } else {
                    return book;
                }
            })
        };
    }
    if(action.type == "GET_USER_INFO"){
        state={
            ...state,
            user: action.user
        }
    }
    console.log("state", state);
    return state;
}
