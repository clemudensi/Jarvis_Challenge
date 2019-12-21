import {Document, model, Model, Schema} from 'mongoose';

interface IPriceFeedDocument extends Document {
    symbol: string;
    providerName: string;
    commission: number;
}

type PriceFeedModel = Model<IPriceFeedDocument>;

const PriceFeedSchema: Schema = new Schema({
    symbol: String,
    providerName: String,
    commission: Number,
    time: { type: Date, default: Date.now },
});

const PriceFeed: PriceFeedModel = model<IPriceFeedDocument>('PriceFeed', PriceFeedSchema);

export {
    PriceFeed,
    IPriceFeedDocument,
    PriceFeedModel,
};
