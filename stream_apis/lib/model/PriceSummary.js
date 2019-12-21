"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var PriceSummarySchema = new mongoose_1.Schema({
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
        provider: String,
    },
});
var PriceSummary = mongoose_1.model('PriceSummary', PriceSummarySchema);
exports.PriceSummary = PriceSummary;
