"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
var mongoose = require("mongoose");
dotenv.config();
mongoose.connect("" + process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(function () { console.log('Connected to the Database'); })["catch"](function (error) { return console.error(error); });
