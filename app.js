const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require('path');

const app = express();
dotenv.config()

app.set("view engine", "ejs");

app.set('views', path.join(__dirname, '/themes'));

//App Settings
const theme = process.env.APP_THEME || "opencs"
const port = process.env.APP_PORT || 80;
const locale = process.env.APP_LOCALE || "en";

//=====================
// ROUTES
//=====================

app.use('/assets', express.static('themes/' + theme + '/assets'))

app.get("/", function (req, res) {
    let locale = req.query.locale || locale

    var indexVars = {
        page_title: 'tester',
        company_name: process.env.COMPANY_NAME,
        company_email: process.env.COMPANY_EMAIL,
        locale: locale,
        categories: [
            {name: 'MC'},
            {name: 'vps'},
            {name: 'web'}
        ],
        services: [
            {name: 'gay', category: 'MC'},
            {name: 'gay2', category: 'MC'},
            {name: 'gay3', category: 'vps'},
            {name: 'gay', category: 'vps'},
            {name: 'gay7', category: 'web'},
            {name: 'gay7', category: 'web'}
        ]
    };

    res.render(theme + "/pages/index", indexVars);
});

app.get("/auth/login", function (req, res) {
    res.render(theme + "/pages/login", {
        page_title: "login",
        company_name: process.env.COMPANY_NAME,
        locale: req.query.locale
    });
    console.log(req.query.locale)
});

app.listen(port, function () {
    console.log("App has started on port: " + port);
});