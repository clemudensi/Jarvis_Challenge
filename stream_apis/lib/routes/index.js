"use strict";
exports.__esModule = true;
var express = require("express");
var price_feeds_1 = require("../controllers/price_feeds");
var router = express.Router();
var priceFeed = new price_feeds_1.PriceFeedAPI();
router.get('/', function (req, res) {
    res.send("<h1>Jarvis Stream API</h1>");
});
router.post('/pricefeed/new', priceFeed.addPriceFeed);
router.get('/pricefeeds', priceFeed.getPriceFeed);
router.put('/pricefeed/:id', priceFeed.updatePriceFeed);
router["delete"]('/pricefeed/:id', priceFeed.removePriceFeed);
exports["default"] = router;
