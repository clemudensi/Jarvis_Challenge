import * as express from 'express';
import {PriceFeedAPI} from '../controllers/price_feeds';
const router = express.Router();
const priceFeed = new PriceFeedAPI();

router.get('/', (req, res): any => {
    res.send(`<h1>Jarvis Stream API</h1>`)
});

router.post('/pricefeed/new', priceFeed.addPriceFeed);
router.get('/pricefeeds', priceFeed.getPriceFeed);
router.put('/pricefeed/:id', priceFeed.updatePriceFeed);
router.delete('/pricefeed/:id', priceFeed.removePriceFeed);

export default router;
