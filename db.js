var spicedPg = require("spiced-pg");
let dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    var { dbUser, dbPass } = require("./secrets.json");
    dbUrl = `postgres:${dbUser}:${dbPass}@localhost:5432/socialnetwork`;
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

module.exports = {
    registerUser
};
