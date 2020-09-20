const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require('path');

const app = express();
dotenv.config()

app.set("view engine", "ejs");

app.set('views', path.join(__dirname, '/themes'));

//App Settings
const theme = process.env.THEME || "opencs"
const themedir = theme + "/"
const port = process.env.PORT || 80;

//=====================
// ROUTES
//=====================

app.use('/assets', express.static(themedir + 'assets/'))

app.get("/", function (req, res) {
    res.render(themedir + "pages/index", `{page_title: ""}`);
});

app.listen(port, function () {
    console.log("App has started on port: " + port);
}); 