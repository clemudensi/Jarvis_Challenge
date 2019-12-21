import 'mocha'
import { expect } from 'chai';
import { PriceStream, PriceAggregator, PriceFeed, TimeFrame } from '../streams';

declare var describe: Mocha.SuiteFunction;
declare var beforeEach: Mocha.HookFunction;
declare var it: Mocha.TestFunction;

const initPriceFeed: { symbol: string; commission: number; providerName: string } = {
    symbol: 'BTC/USD',
    providerName: 'Peter',
    commission: 1.2,
};

const newPriceFeed: { symbol: string; commission: number; providerName: string } = {
    symbol: 'EUR/USD',
    providerName: 'Ramos',
    commission: 1.35,
};

const newPriceFeed1: { symbol: string; commission: number; providerName: string } = {
    symbol: 'PND/USD',
    providerName: 'Wayne',
    commission: 1.42,
};

describe('Price Feeds', () => {
    let feed$: PriceStream<PriceAggregator> ;
    beforeEach(() => {
        feed$ = new PriceStream(initPriceFeed)
    });

    it('should return `ConnectableObservable<PriceSummary>`',() =>{
        const res = feed$.getFeedForTimeFrame(TimeFrame.s5);
        expect(res.constructor.name).equals('Observable');
    });

    it('should add a new price feed to the aggregator instance',() => {
        const res = feed$.addPriceFeed(<PriceFeed>newPriceFeed);
        feed$.addPriceFeed(<PriceFeed>newPriceFeed1);
        expect(feed$._store[1].providerName).equals('Ramos');
        expect(res).equals(true);
    });

    it('should remove the price feed with the specified `providerName`',() => {
        feed$.addPriceFeed(<PriceFeed>newPriceFeed);
        feed$.addPriceFeed(<PriceFeed>newPriceFeed1);
        const res = feed$.removePriceFeed('Wayne');
        expect(res).equals(true);
    });
});
