const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const csurf = require("csurf");
const db = require("./db");

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

app.post("/register", (req, res) => {
    console.log("inside register post");
    console.log("req.body", req.body);
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
                    req.session.user = {
                        id: results.id,
                        firstname: results.firstname,
                        lastname: results.lastname,
                        email: results.email
                    };
                    res.json({
                        success: true
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

//=====================GENERIC ROUTE============================================
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
