"use strict";
exports.__esModule = true;
require("mocha");
var chai_1 = require("chai");
var chai = require("chai");
var request = require("supertest");
// @ts-ignore
var chaiHttp = require("chai-http");
chai.use(chaiHttp);
var price_feeds_1 = require("../lib/controllers/price_feeds");
var app_1 = require("../app");
var priceFeedItem = {
    symbol: "BTC/EUR",
    providerName: "Polarex",
    commission: 1.25
};
var updatePriceFeed = {
    symbol: "ETH/EUR",
    providerName: "Swan",
    commission: 1.55
};
describe('PriceFeed API', function () {
    var documentId;
    var priceFeed;
    beforeEach(function () {
        priceFeed = new price_feeds_1.PriceFeedAPI();
    });
    it('should add a new price feed', function (done) {
        request(app_1["default"])
            .post('/api/pricefeed/new')
            .send(priceFeedItem)
            .set('Accept', 'application/json')
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function (error, result) {
            if (error) {
                return done(error);
            }
            chai_1.expect(result.body).to.not.be.empty;
            chai_1.expect(result.body).to.be.an('object');
            chai_1.expect(result.body.priceFeed)
                .to.include
                .keys(['symbol', 'providerName', 'commission']);
            chai_1.expect(result.statusCode).to.be.equal(201);
            documentId = result.body.priceFeed._id;
            return done();
        });
    });
    it('should get all price feed', function (done) {
        request(app_1["default"])
            .get('/api/pricefeeds')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (error, result) {
            if (error) {
                return done(error);
            }
            chai_1.expect(result.body).to.not.be.empty;
            chai_1.expect(result.body.priceFeeds).to.be.an('array');
            chai_1.expect(result.body.priceFeeds[0]).to.include.keys(['symbol', 'providerName', 'commission']); // true
            return done();
        });
    }).timeout(10000);
    it('should update existing price feed', function (done) {
        request(app_1["default"])
            .put("/api/pricefeed/" + documentId)
            .send(updatePriceFeed)
            .set('Accept', 'application/json')
            .expect(202)
            .expect('Content-Type', /json/)
            .end(function (error, result) {
            if (error) {
                return done(error);
            }
            chai_1.expect(result.body).to.not.be.empty;
            chai_1.expect(result.body).to.be.an('object');
            chai_1.expect(result.body.priceFeed)
                .to.include
                .keys(['symbol', 'providerName', 'commission']);
            chai_1.expect(result.statusCode).to.be.equal(202);
            done();
        });
    });
    it('should delete existing price feed', function (done) {
        request(app_1["default"])["delete"]("/api/pricefeed/" + documentId)
            .set('Accept', 'application/json')
            .expect(204)
            .end(function (error, result) {
            if (error) {
                return done(error);
            }
            chai_1.expect(result.body).to.be.empty;
            chai_1.expect(result.statusCode).to.be.equal(204);
            done();
        });
    });
});
