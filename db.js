var spicedPg = require("spiced-pg");
let dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    var { dbUser, dbPass } = require("./secrets.json");
    dbUrl = `postgres:${dbUser}:${dbPass}@localhost:5432/final-project`;
}

var db = spicedPg(dbUrl);

function registerUser(firstname, lastname, email, hashed_password) {
    return db
        .query(
            `INSERT INTO users (firstname, lastname, email, hashed_password) VALUES ($1, $2, $3, $4) RETURNING *`,
            [firstname, lastname, email, hashed_password]
        )
        .then(function(results) {
            console.log("register user", results);
            return results.rows;
        });
}

function login(typedEmail) {
    return db
        .query(`SELECT * FROM users WHERE email=$1`, [typedEmail])
        .then(function(results) {
            console.log("inside db", results.rows);
            return results.rows;
        });
}

function getInspirationQuote() {
    return db
        .query(`SELECT * FROM quotes WHERE type = 'inspiration'`)
        .then(function(results) {
            return results.rows;
        });
}

function getMotivationQuote() {
    return db
        .query(`SELECT * FROM quotes WHERE type='motivation'`)
        .then(function(results) {
            return results.rows;
        });
}
function addBook(userId, title, author) {
    return db
        .query(
            `INSERT INTO books (user_id, status, title, author) VALUES ($1, 1, $2, $3) RETURNING *`,
            [userId, title, author]
        )
        .then(function(results) {
            return results.rows[0];
        });
}

function getBooks(userId) {
    return db
        .query(
            `SELECT id, user_id, status, title, author, to_char(created_at, 'dd.mm.yyyy'), to_char(updated_at, 'dd.mm.yyyy') FROM books WHERE user_id = $1 ORDER BY created_at DESC`,
            [userId]
        )
        .then(function(results) {
            return results.rows;
        });
}

function startReading(userId, bookId) {
    return db
        .query(
            `UPDATE books SET status=2 WHERE user_id=$1 AND id=$2 RETURNING*`,
            [userId, bookId]
        )
        .then(function(results) {
            console.log("reading Book", results.rows);
            return results.rows[0];
        });
}

function finishReadingBook(userId, bookId) {
    return db
        .query(
            `UPDATE books SET status=3 WHERE user_id=$1 AND id=$2 RETURNING*`,
            [userId, bookId]
        )
        .then(function(results) {
            console.log("finished Book", results.rows);
            return results.rows[0];
        });
}

function saveNote(userId, bookId, note) {
    return db
        .query(
            `INSERT INTO notes (user_id, book_id, note) VALUES ($1, $2, $3) RETURNING *`,
            [userId, bookId, note]
        )
        .then(function(results) {
            console.log("single note saved in db", results.rows[0]);
            return results.rows[0];
        });
}

function getNotes(userId) {
    return db
        .query(
            `SELECT id, user_id, book_id, note, to_char(created_at, 'dd.mm.yyyy'), to_char(updated_at, 'dd.mm.yyyy') FROM notes WHERE user_id=$1`,
            [userId]
        )
        .then(function(results) {
            console.log("inside db", results.rows);
            return results.rows;
        });
}
function getUserInfo(userId) {
    return db
        .query(`SELECT * FROM users WHERE id=$1`, [userId])
        .then(function(results) {
            return results.rows[0];
        });
}

module.exports = {
    registerUser,
    login,
    getInspirationQuote,
    getMotivationQuote,
    addBook,
    getBooks,
    startReading,
    finishReadingBook,
    saveNote,
    getNotes,
    getUserInfo
};
