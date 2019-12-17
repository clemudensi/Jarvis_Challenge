"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var PriceSummarySchema = new Schema({
    symbol: String,
    timestamp: Date,
    bestBuyPrice: {
        value: Number,
        spread: Number,
        provider: String,
    },
    bestSellPrice: {
        value: Number,
        spread: Number,
        provider: String
    }
});
var PriceSummary = mongoose_1["default"].model('PriceSummary', PriceSummarySchema);
exports["default"] = PriceSummary;
