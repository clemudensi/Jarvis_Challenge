"use strict";
exports.__esModule = true;
require("mocha");
var chai_1 = require("chai");
var chai = require("chai");
var request = require("supertest");
// @ts-ignore
var chaiHttp = require("chai-http");
chai.use(chaiHttp);
var app_1 = require("../app");
var priceSum = {
    "timestamp": new Date(),
    "symbol": "BTC/USD",
    "bestBuyPrice": { "value": 122, "spread": -3, "provider": "Peter" },
    "bestSellPrice": { "value": 123, "spread": 3, "provider": "Peter" }
};
// set-timeout to  10000ms during testing
describe('Price Summary', function () {
    it('should add a new price summary', function (done) {
        request(app_1["default"])
            .post('/api/pricesummary/new')
            .send(priceSum)
            .set('Accept', 'application/json')
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function (error, result) {
            if (error) {
                return done(error);
            }
            chai_1.expect(result.body).to.not.be.empty;
            chai_1.expect(result.body).to.be.an('object');
            chai_1.expect(result.body.priceSummary)
                .to.include
                .keys(['symbol', 'timestamp', 'bestBuyPrice', "bestSellPrice"]);
            chai_1.expect(result.statusCode).to.be.equal(201);
            return done();
        });
    });
    it('should get all price summary', function (done) {
        request(app_1["default"])
            .get('/api/pricesummaries')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (error, result) {
            if (error) {
                return done(error);
            }
            chai_1.expect(result.body).to.not.be.empty;
            chai_1.expect(result.body.priceSummary).to.be.an('array');
            chai_1.expect(result.body.priceSummary[0]).to.include.keys(['symbol', 'timestamp', 'bestBuyPrice', "bestSellPrice"]); // true
            return done();
        });
    });
});
