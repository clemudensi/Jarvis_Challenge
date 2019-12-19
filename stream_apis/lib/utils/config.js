"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var path;
switch (process.env.NODE_ENV) {
    case "test":
        path = __dirname + "/../../.env.test";
        break;
    case "production":
        path = __dirname + "/../../.env.production";
        break;
    default:
        path = __dirname + "/../../.env.development";
}
dotenv.config({ path: path });
exports.APP_ID = process.env.APP_ID;
exports.LOG_LEVEL = process.env.LOG_LEVEL;
