import { Model } from 'mongoose';
import {IPriceSummaryDocument, PriceSummary, PriceSummaryModel} from '../model/PriceSummary';

export interface IPriceSummary extends Model<PriceSummaryModel> {
    getFeedForTimeFrame(): Promise<IPriceSummaryDocument>;
    addFeedForTimeFrame(): Promise<IPriceSummaryDocument>;
}

class PriceSummaryFeed<T> {
    public async getFeedForTimeFrame(req, res): Promise<IPriceSummary> {
        const priceSummary: IPriceSummaryDocument[] = await PriceSummary.find();
        return res.send({ success: true, priceSummary });
    }

    public async addFeedForTimeFrame(req, res): Promise<IPriceSummary> {
        const feed = req.body;
        try {
            const newFeed = new PriceSummary(feed);
            const priceSummary: IPriceSummaryDocument = await newFeed.save();
            return res.status(201).send({ success: true, priceSummary });
        } catch (err) {
            res.send(err);
        }
    }
}

export {
    Model,
    PriceSummaryFeed,
    IPriceSummaryDocument,
    PriceSummaryModel,
};
