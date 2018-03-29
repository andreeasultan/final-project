const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const csurf = require("csurf");

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

//=====================GENERIC ROUTE==============================
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
