"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var PriceFeedSchema = new Schema({
    symbol: String,
    providerName: String,
    commission: Number,
    time: { type: Date, "default": Date.now },
});
var PriceFeed = mongoose_1["default"].model('PriceFeed', PriceFeedSchema);
exports["default"] = PriceFeed;
