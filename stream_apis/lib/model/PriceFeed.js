"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var PriceFeedSchema = new mongoose_1.Schema({
    symbol: String,
    providerName: String,
    commission: Number,
    time: { type: Date, "default": Date.now },
});
var PriceFeed = mongoose_1.model('PriceFeed', PriceFeedSchema);
exports.PriceFeed = PriceFeed;
