import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
        provider: String
    }
});

const PriceSummary = mongoose.model('PriceSummary', PriceSummarySchema);

export default PriceSummary;
