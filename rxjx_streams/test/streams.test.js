"use strict";
exports.__esModule = true;
require("mocha");
var chai_1 = require("chai");
var streams_1 = require("../streams");
var initPriceFeed = {
    symbol: 'BTC/USD',
    providerName: 'Peter',
    commission: 1.2,
};
var newPriceFeed = {
    symbol: 'EUR/USD',
    providerName: 'Ramos',
    commission: 1.35,
};
var newPriceFeed1 = {
    symbol: 'PND/USD',
    providerName: 'Wayne',
    commission: 1.42,
};
describe('Price Feeds', function () {
    var feed$;
    beforeEach(function () {
        feed$ = new streams_1.PriceStream(initPriceFeed);
    });
    it('should return `ConnectableObservable<PriceSummary>`', function () {
        var res = feed$.getFeedForTimeFrame(5000);
        chai_1.expect(res.constructor.name).equals('Observable');
    });
    it('should add a new price feed to the aggregator instance', function () {
        var res = feed$.addPriceFeed(newPriceFeed);
        feed$.addPriceFeed(newPriceFeed1);
        chai_1.expect(feed$._store[1].providerName).equals('Ramos');
        chai_1.expect(res).equals(true);
    });
    it('should remove the price feed with the specified `providerName`', function () {
        feed$.addPriceFeed(newPriceFeed);
        feed$.addPriceFeed(newPriceFeed1);
        var res = feed$.removePriceFeed('Wayne');
        chai_1.expect(res).equals(true);
    });
});
