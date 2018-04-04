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
        console.log("registered user", data);
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
        console.log("logedIn user", data);
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
        console.log(data);
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

// export function getReadingBooks() {
//     return axios.get("/get-reading-books").then(function({ data }) {
//         return {
//             type: "GET_READING_BOOKS",
//             books: data.books
//         };
//     });
// }

export function finishReadingBook(bookData) {
    return axios.post("/finish-reading", bookData).then(function({ data }) {
        return {
            type: "FINISH_READING",
            finishedBook: data.book
        };
    });
}

// export function getFinishedBooks() {
//     return axios.get("/get-finished-books").then(function({ data }) {
//         return {
//             type: "GET_FINISHED_BOOKS",
//             books: data.books
//         };
//     });
// }
