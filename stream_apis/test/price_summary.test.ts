import 'mocha'
import { expect } from 'chai'
import * as chai from 'chai'
import * as request from 'supertest'
// @ts-ignore
import * as chaiHttp from 'chai-http';
chai.use(chaiHttp);
import { IPriceSummaryDocument } from '../lib/model/PriceSummary'
import app from '../app'

const priceSum: IPriceSummaryDocument = {
    "timestamp": new Date(),
    "symbol":"BTC/USD",
    "bestBuyPrice":{"value":122,"spread":-3,"provider":"Peter"},
    "bestSellPrice":{"value":123,"spread":3,"provider":"Peter"}
};

// set-timeout to  10000ms during testing
describe('Price Summary', () => {
    it('should add a new price summary',(done) => {
        request(app)
            .post('/api/pricesummary/new')
            .send(priceSum)
            .set('Accept', 'application/json')
            .expect(201)
            .expect('Content-Type', /json/)
            .end((error, result) => {
                if (error) {
                    return done(error);
                }
                expect(result.body).to.not.be.empty;
                expect(result.body).to.be.an('object');
                expect(result.body.priceSummary)
                    .to.include
                    .keys(['symbol', 'timestamp', 'bestBuyPrice', "bestSellPrice"]);
                expect(result.statusCode).to.be.equal(201);
                return done();
            })
    });

    it('should get all price summary',  (done) => {
        request(app)
            .get('/api/pricesummaries')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((error, result) => {
                if (error) {
                    return done(error);
                }

                expect(result.body).to.not.be.empty;
                expect(result.body.priceSummary).to.be.an('array');
                expect(result.body.priceSummary[0]).to.include.keys(
                    ['symbol', 'timestamp', 'bestBuyPrice', "bestSellPrice"]); // true
                return done();
            });
    });
});
