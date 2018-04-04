import React from "react";

export default function(state = {}, action) {
    console.log("inside ther reducer");
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
        books.forEach((book) => {
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

    if(action.type == "FINISH_READING"){
        books = state.books.slice();
        books.forEach((book) => {
            if(book.id == action.finishedBook.id) {
                book.status = 3
            }
        });

        state = {
            ...state,
            books
        }
    }

    if(action.type == "GET_FINISHED_BOOKS"){
        state = {
            ...state,
            books: action.books
        }
    }
    console.log("state", state);
    return state;
}
