"use strict";
exports.__esModule = true;
var express = require("express");
var price_feeds_1 = require("../controllers/price_feeds");
var price_summary_1 = require("../controllers/price_summary");
var router = express.Router();
var priceFeed = new price_feeds_1.PriceFeedAPI();
var priceSummary = new price_summary_1.PriceSummaryFeed();
router.get('/', function (req, res) {
    res.send("<h1>Jarvis Stream API</h1>");
});
router.post('/pricefeed/new', priceFeed.addPriceFeed);
router.post('/pricesummary/new', priceSummary.addFeedForTimeFrame);
router.get('/pricefeeds', priceFeed.getPriceFeed);
router.get('/pricesummaries', priceSummary.getFeedForTimeFrame);
router.put('/pricefeed/:id', priceFeed.updatePriceFeed);
router["delete"]('/pricefeed/:id', priceFeed.removePriceFeed);
exports["default"] = router;
