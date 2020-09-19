var dotenv = require("dotenv")
dotenv.config()
var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose =
        require("passport-local-mongoose"),
    User = require("./models/user");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Theme setting
let themedir = "themes/" + process.env.THEME + "/"

//=====================
// ROUTES
//=====================

app.use('/assets', express.static(themedir + 'assets/'))

app.get("/", function (req, res) {
    res.render(themedir + "pages/index");
});

var port = process.env.PORT || 80;
app.listen(port, function () {
    console.log("App has started on port " + port);
}); 