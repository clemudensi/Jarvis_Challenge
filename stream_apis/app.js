"use strict";
exports.__esModule = true;
var express = require("express");
var compression = require("compression");
var bodyParser = require("body-parser");
var cors = require("cors");
var routes_1 = require("./routes");
var app = express();
var port = process.env.PORT || 8000;
var corsOption = {
    origin: true,
    methods: 'HEAD, GET, POST, PUT, PATCH, DELETE',
    credentials: true
};
app.use(compression());
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use('/api', routes_1["default"]);
app.listen(port, function () {
    console.log("listening on port " + port);
});
// module.exports = router;
