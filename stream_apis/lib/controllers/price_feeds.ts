import { Model } from 'mongoose';
import {IPriceFeedDocument, PriceFeed, PriceFeedModel} from '../model/PriceFeed';

export interface IPriceFeeds extends Model<PriceFeedModel> {
    addPriceFeed(): Promise<IPriceFeedDocument>;
    getPriceFeed(): Promise<IPriceFeedDocument>;
    updatePriceFeed(): Promise<IPriceFeedDocument>;
    removePriceFeed(): Promise<IPriceFeedDocument>;
}

interface IPriceFeed {
    symbol: string;
    providerName: string;
    commission: number;
}

class PriceFeedAPI<T> {

    public async addPriceFeed(req, res): Promise<IPriceFeeds> {
        const feed = req.body;
        try {
            const newFeed = new PriceFeed(feed);
            const priceFeed: IPriceFeed = await newFeed.save();
            return res.status(201).send({ success: true, priceFeed });
        } catch (err) {
            res.send(err);
        }
    }

    public async getPriceFeed(req, res): Promise<IPriceFeeds> {
        const { page }: { page: number } = req.query;
        const limit: number = 50;
        try {
            const priceFeeds: IPriceFeed =  await PriceFeed
                .find().skip( limit * (page - 1) ).limit( limit );
            return res.status(200).send({ success: true, priceFeeds });
        } catch (err) {
            res.send(err);
        }
    }

    public async updatePriceFeed(req, res): Promise<IPriceFeeds> {
        const feed = req.body;
        const { id }: { id: number} = req.params;
        if (!feed) {
            res.send({
                msg: 'Could not update the campaign please endeavour to fill in all form requirement',
            });
        }
        try {
            const priceFeed = await PriceFeed.findByIdAndUpdate(
                id, feed, { new: true });
            return res.status(202).send({ success: true, priceFeed });
        } catch (err) {
            res.send(err);
        }
    }

    public async removePriceFeed(req, res): Promise<IPriceFeeds> {
        const { priceFeedId }: { priceFeedId: number} = req.params;
        try {
            await PriceFeed.findOneAndDelete(priceFeedId);
            return res.sendStatus(204);
        } catch (err) {
            res.send(err);
        }
    }
}

export {
    Model,
    PriceFeedAPI,
    PriceFeedModel,
    IPriceFeed,
};
