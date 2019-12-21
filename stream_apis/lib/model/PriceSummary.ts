import {Document, model, Model, Schema} from 'mongoose';

interface IPriceSummaryDocument extends Document {
    symbol: string;
    timestamp: Date;
    bestBuyPrice: {
        value: number,
        spread: number; // the difference between `value` and the sell price @ provider
        provider: string;
    };
    bestSellPrice: {
        value: number,
        spread: number; // the difference between `value` and the buy price @ provider
        provider: string;
    };
}

type PriceSummaryModel = Model<IPriceSummaryDocument>;

const PriceSummarySchema = new Schema({
    symbol: String,
    timestamp: Date,
    bestBuyPrice: {
        value: Number,
        spread: Number, // the difference between `value` and the sell price @ provider
        provider: String,
    },
    bestSellPrice: {
        value: Number,
        spread: Number, // the difference between `value` and the buy price @ provider
        provider: String,
    },
});

const PriceSummary: PriceSummaryModel = model<IPriceSummaryDocument>('PriceSummary', PriceSummarySchema);

export {
    PriceSummary,
    PriceSummaryModel,
    IPriceSummaryDocument,
};
