import axios from "./axios";

export function handleRegistration(fieldName, fieldValue) {
    return {
        type: "USER_DATA",
        fieldName: fieldName,
        fieldValue: fieldValue
    };
}

export function registerUser(userData) {
    return axios.post("/register", userData).then(function({ data }) {
        if (data.success) {
            location.replace("/home");
        }
        return {
            type: "REGISTER_USER",
            registeredUser: data.data
        };
    });
}

export function loginUser(userData) {
    return axios.post("/login", userData).then(function({ data }) {
        if (data.success) {
            location.replace("/home");
        }
        return {
            type: "LOGIN_USER",
            logedUser: data.data
        };
    });
}

export function getInspirationQuote() {
    return axios.get("/inspiration").then(function({ data }) {
        return {
            type: "INSPIRATION_QUOTE",
            quote: data.quote
        };
    });
}

export function getMotivationQuote() {
    return axios.get("/motivation").then(function({ data }) {
        return {
            type: "MOTIVATION_QUOTE",
            quote: data.quote
        };
    });
}

export function getBookData(fieldName, fieldValue) {
    return {
        type: "BOOK_DATA",
        fieldName: fieldName,
        fieldValue: fieldValue
    };
}

export function addBook(bookData) {
    return axios.post("/add-book", bookData).then(function({ data }) {
        return {
            type: "ADD_BOOK",
            addedBook: data.book
        };
    });
}

export function getBooks() {
    return axios.get("/get-books").then(function({ data }) {
        console.log("inside get books to read", data.books);
        return {
            type: "GET_BOOKS",
            books: data.books
        };
    });
}

export function startReading(bookData) {
    return axios.post("/start-reading", bookData).then(function({ data }) {
        return {
            type: "START_READING",
            readingBook: data.book
        };
    });
}

export function finishReadingBook(bookData) {
    return axios.post("/finish-reading", bookData).then(function({ data }) {
        return {
            type: "FINISH_READING",
            finishedBook: data.book
        };
    });
}

export function showNotesUploader(bookId) {
    return {
        type: "SHOW_NOTES_UPLOADER",
        bookId: bookId
    };
}

export function closeNotesUploader(bookId) {
    return {
        type: "CLOSE_NOTES_UPLOADER",
        bookId: bookId
    };
}
export function getNoteValue(bookId, fieldValue) {
    return {
        type: "GET_NOTE_VALUE",
        bookId:bookId,
        fieldValue: fieldValue
    };
}

export function saveNote(bookId, noteData) {
    return axios
        .post("/save-note/" + bookId, {note: noteData})
        .then(function({ data }) {
            console.log("data.note", data.note);
            return {
                type: "SAVE_NOTE",
                note: data.note
            };
        });
}

export function getNotes() {
    return axios.get("/get-notes/").then(function({ data }) {
        return {
            type: "GET_NOTES",
            notes: data.notes
        };
    });
}

export function showDetailsUploader(bookId){
    return {
        type: "SHOW_DETAILS_UPLOADER",
        bookId: bookId
    };
}

export function closeDetailsUploader(bookId){
    return {
        type: "CLOSE_DETAILS_UPLOADER",
        bookId: bookId
    };
}
