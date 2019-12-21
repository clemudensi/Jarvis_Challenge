import * as express from 'express';
import {PriceFeedAPI} from '../controllers/price_feeds';
import {PriceSummaryFeed} from '../controllers/price_summary';

const router = express.Router();
const priceFeed = new PriceFeedAPI();
const priceSummary = new PriceSummaryFeed();

router.get('/', (req, res): any => {
    res.send(`<h1>Jarvis Stream API</h1>`);
});

router.post('/pricefeed/new', priceFeed.addPriceFeed);
router.post('/pricesummary/new', priceSummary.addFeedForTimeFrame);
router.get('/pricefeeds', priceFeed.getPriceFeed);
router.get('/pricesummaries', priceSummary.getFeedForTimeFrame);
router.put('/pricefeed/:id', priceFeed.updatePriceFeed);
router.delete('/pricefeed/:id', priceFeed.removePriceFeed);

export default router;
