"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();
mongoose.connect("" + process.env.DB, { useNewUrlParser: true })
    .then(function () { console.log('Connected to the Database'); })["catch"](function (error) { return console.error(error); });
