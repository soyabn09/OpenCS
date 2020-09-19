const path = require('path');
const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.use("/assets", express.static('resources/assets'))

app.listen(80);