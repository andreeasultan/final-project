const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const csurf = require("csurf");
const db = require("./db");

app.use(express.static("public"));
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
    cookieSession({
        secret: process.env.SESSION_SECRET || require("./secrets").secret,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
//===================REGISTRATION AND LOGIN=====================================

function hashPassword(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}

function checkPassword(plainTextPassword, hashedPasswordDb) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(plainTextPassword, hashedPasswordDb, function(
            err,
            doesMatch
        ) {
            if (err) {
                console.log("error");
                reject(err);
            } else {
                console.log("success", doesMatch);
                resolve(doesMatch);
            }
        });
    });
}

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.post("/register", (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        res.json({
            success: false,
            error: "It looks you missed something. Try again!"
        });
    } else {
        hashPassword(password).then(hash => {
            db
                .registerUser(firstname, lastname, email, hash)
                .then(results => {
                    console.log("results", results);
                    req.session.user = {
                        id: results[0].id,
                        firstname: results[0].firstname,
                        lastname: results[0].lastname,
                        email: results[0].email
                    };
                    console.log("req.session.user", req.session.user);
                    res.json({
                        success: true,
                        data: results[0]
                    });
                })
                .catch(err => {
                    console.log("error", err);
                    res.json({
                        success: false,
                        error: "Oups, something went wrong. Try again!"
                    });
                });
        });
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("req.body", req.body);
    if (!email || !password) {
        res.json({
            success: false,
            error: "It looks you missed something. Try again!"
        });
    } else {
        db.login(email).then(results => {
            console.log("login results", results);
            return checkPassword(password, results[0].hashed_password)
                .then(doesMatch => {
                    if (doesMatch) {
                        req.session.user = {
                            id: results[0].id,
                            firstname: results[0].firstname,
                            lastname: results[0].lastname,
                            email: results[0].email
                        };
                        console.log("login req.session", req.session);
                        res.json({ success: true });
                    } else {
                        res.json({
                            success: false,
                            error:
                                "Your email address or password is not correct. Try again!"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        success: false,
                        error: "Somehting went wrong. Try again!"
                    });
                });
        });
    }
});

//======================GENERATE QUOTE==========================================
app.get("/inspiration", (req, res) => {
    db.getInspirationQuote().then(quotes => {
        let randomNumber = Math.floor(Math.random() * quotes.length);
        let randomQuote = quotes[randomNumber];
        res.json({
            success: true,
            quote: randomQuote
        });
    });
});

app.get("/motivation", (req, res) => {
    db.getMotivationQuote().then(quotes => {
        let randomNumber = Math.floor(Math.random() * quotes.length);
        let randomQuote = quotes[randomNumber];
        res.json({
            success: true,
            quote: randomQuote
        });
    });
});
//========================WANNA READ============================================
app.post("/add-book", (req, res) => {
    db
        .addBook(req.session.user.id, req.body.title, req.body.author)
        .then(book => {
            console.log("inside index.js book", book);
            res.json({
                success: true,
                book: book
            });
        });
});

app.get("/get-books/", (req, res) => {
    console.log("req.session.user.id", req.session.user.id);
    db.getBooks(req.session.user.id).then(books => {
        console.log("book we got back from db", books);
        res.json({
            success: true,
            books: books
        });
    });
});

app.post("/start-reading", (req, res) => {
    db.startReading(req.session.user.id, req.body.book.id).then(book => {
        res.json({
            success: true,
            book: book
        });
    });
});

app.post("/finish-reading", (req, res) => {
    console.log("inside finish-reading");
    console.log(req.body.book.id);
    db.finishReadingBook(req.session.user.id, req.body.book.id).then(book => {
        res.json({
            success: true,
            book: book
        });
    });
});

app.get("/get-notes", (req, res) => {
    db.getNotes(req.session.user.id).then(notes => {
        console.log("notes", notes);
        res.json({
            success: true,
            notes: notes
        });
    });
});

app.post("/save-note/:id", (req, res) => {
    console.log("req.body", req.body);
    db
        .saveNote(req.session.user.id, req.params.id, req.body.note)
        .then(note => {
            res.json({
                success: true,
                note: note
            });
        });
});

//=====================GENERIC ROUTE============================================
app.get("*", function(req, res) {
    // if (!req.session.user) {
    //     return res.redirect("/");
    // } else {
        res.sendFile(__dirname + "/index.html");
    // }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
