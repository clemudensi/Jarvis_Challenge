import 'mocha'
import { expect } from 'chai'
import * as chai from 'chai'
import * as request from 'supertest'
// @ts-ignore
import * as chaiHttp from 'chai-http';
chai.use(chaiHttp);
import { IPriceFeed } from '../lib/controllers/price_feeds';
import app from '../app'

const priceFeedItem: IPriceFeed = {
    symbol : "BTC/EUR",
    providerName : "Polarex",
    commission : 1.25
};

const updatePriceFeed: IPriceFeed = {
    symbol : "ETH/EUR",
    providerName : "Swan",
    commission : 1.55
};

// set-timeout to  10000ms during testing
describe('PriceFeed API', () => {
    let documentId: string;

    it('should add a new price feed',(done) => {
        request(app)
            .post('/api/pricefeed/new')
            .send(priceFeedItem)
            .set('Accept', 'application/json')
            .expect(201)
            .expect('Content-Type', /json/)
            .end((error, result) => {
                if (error) {
                    return done(error);
                }
                expect(result.body).to.not.be.empty;
                expect(result.body).to.be.an('object');
                expect(result.body.priceFeed)
                    .to.include
                    .keys(['symbol', 'providerName', 'commission']);
                expect(result.statusCode).to.be.equal(201);
                documentId = result.body.priceFeed._id;
                return done();
            })
    });

    it('should get all price feed',  (done) => {
        request(app)
            .get('/api/pricefeeds')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((error, result) => {
                if (error) {
                    return done(error);
                }

                expect(result.body).to.not.be.empty;
                expect(result.body.priceFeeds).to.be.an('array');
                expect(result.body.priceFeeds[0]).to.include.keys(
                    ['symbol', 'providerName', 'commission']); // true
                return done();
            });
    });

    it('should update existing price feed',(done) => {
        request(app)
            .put(`/api/pricefeed/${documentId}`)
            .send(updatePriceFeed)
            .set('Accept', 'application/json')
            .expect(202)
            .expect('Content-Type', /json/)
            .end((error, result) => {
                if (error) {
                    return done(error);
                }
                expect(result.body).to.not.be.empty;
                expect(result.body).to.be.an('object');
                expect(result.body.priceFeed)
                    .to.include
                    .keys(['symbol', 'providerName', 'commission']);
                expect(result.statusCode).to.be.equal(202);
                done();
            })
    });

    it('should delete existing price feed',(done) => {
        request(app)
            .delete(`/api/pricefeed/${documentId}`)
            .set('Accept', 'application/json')
            .expect(204)
            .end((error, result) => {
                if (error) {
                    return done(error);
                }
                expect(result.body).to.be.empty;
                expect(result.statusCode).to.be.equal(204);
                done();
            })
    });
});
