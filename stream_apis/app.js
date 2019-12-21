"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var compression = require("compression");
var cors = require("cors");
var express = require("express");
require("./db");
var routes_1 = require("./lib/routes");
var app = express();
var port = process.env.PORT || 8000;
var corsOption = {
    credentials: true,
    methods: 'DELETE, GET, HEAD, PATCH, POST, PUT',
    origin: true,
};
app.use(compression());
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes_1["default"]);
app.listen(port, function () {
    console.log("listening on port " + port);
});
exports["default"] = app;
