import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PriceFeedSchema = new Schema({
    symbol: String,
    providerName: String,
    commission: Number,
    time: { type: Date, default: Date.now },
});

const PriceFeed = mongoose.model('PriceFeed', PriceFeedSchema);

export default PriceFeed;
