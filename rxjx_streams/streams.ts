/*
 * Price feeds are streams of price data points which continuously produce
 * values whether or not we're connected to them. As such they can be
 * categorized as 'hot' observable$s in RX. In the following interfaces they're
 * represented by `ConnectableObservable`, in order to enforce the 'hot'
 * properties.
 *
 * Additionally,
 * (See http://reactivex.io/documentation/operators/connect.html)
 *
 * Note: Beware of https://github.com/ReactiveX/rxjs/issues/2972
 */

import { Timestamp, ConnectableObservable, interval, of, from, Observable, Subject } from 'rxjs';
import { map, publish, timestamp } from 'rxjs/operators';

type PriceOffer = {
    buyPrice: number;
    sellPrice: number;
};

type PricePoint = Timestamp<PriceOffer>;

interface PriceFeed extends ConnectableObservable<PricePoint> {
    /*
     * The ticker symbol or trading pair represented whose price feed this
     * instance represents.
     *
     * Examples: "BTC/USD", "EUR/USD", "TSLA", etc.
     */
    symbol: string;

    /*
     * A string identifying the provider (e.g. exchange, broker, etc.) of this
     * price feed.
     */
    providerName: string;

    /*
     * Trade commission represented as percentage of trade position size (e.g.
     * `0.01` would be 1% of the position)
     */
    commission: number;
}

const enum TimeFrame {
    s1  = 1,       // 1 second
    s5  = 5,       // 5 seconds
    s15 = 15,      // 15 seconds
    s30 = 30,      // 30 seconds
    m1  = 60,      // 1 minute
    m5  = 5 * m1,  // 5 minutes
    m15 = 15 * m1, // 15 minutes
    m30 = 30 * m1, // 30 minutes
    h1  = 60 * m1, // 1 hour
    h4  = 4 * h1,  // 4 hours
    d1  = 24 * h1, // 1 day
    w1  = 7 * d1,  // 1 week
    mn1 = 30 * d1, // 1 month
}

interface PriceSummary {
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

interface PriceFeedSet {
    [providerName: string]: PriceFeed;
}

interface PriceAggregator {
    /*
     * Creates a new `PriceAggregator` instance connected to the specified
     * array or set of price feeds.
     */

    /**
     * [CORE CHALLENGE OBJECTIVE]
     * Returns `ConnectableObservable<PriceSummary>` - a stream that "ticks"
     * every `timeFrame` seconds. Each tick produces a new data point
     * containing the best buy and sell price offered during the past
     * `timeFrame` seconds.
     */
    getFeedForTimeFrame(timeFrame: TimeFrame): ConnectableObservable<PriceSummary>;

    /*
     * Adds a new price feed to the aggregator instance.
     *
     * The aggregator instance immediately connects to the newly added price feed
     * add existing users holding reference to `getFeedForTimeFrame`
     *
     * Returns `true` on success or `false` if a price feed with the same
     * `providerName` as the one passed as argument exists.
     */
    addPriceFeed(priceFeed: PriceFeed): boolean;

    /*
     * Removes the price feed with the specified `providerName`.
     *
     * Returns `true` on success or `false` if a price feed with the specified
     * name does not exist.
     */
    removePriceFeed(providerName: string): boolean;
}

// arbitrary value for priceOffer
const priceOffer: PriceOffer = {
    buyPrice: 120,
    sellPrice: 125
};

// arbitrary value for bestBuy and bestSell
const bestBuyValue: number = 122;
const bestSellValue: number = 123;

class PriceStream<T> implements PriceAggregator {
    private readonly _initialPriceFeeds: {
        symbol: string,
        providerName: string,
        commission: number
    };
    _store: any;
    private subject$: Subject<PriceFeed> = new Subject();

    constructor(initialPriceFeeds: { symbol: string, providerName: string, commission: number }){
        this._initialPriceFeeds = initialPriceFeeds;
        this._store = [];

        of(this._initialPriceFeeds)
            .subscribe((item: PriceFeed) => this._store.push(item));
    };

    getFeedForTimeFrame(timeFrame: TimeFrame): ConnectableObservable<PriceSummary> {
        const source$: any = from(this._store);
        const myObservable$ = source$.pipe(map((x: PriceFeed) => {
            return {
                symbol: x.symbol,
                timestamp: new Date,
                bestBuyPrice: {
                    value: bestBuyValue,
                    spread: bestBuyValue - priceOffer.sellPrice,
                    provider: x.providerName,
                },
                bestSellPrice: {
                    value: bestSellValue,
                    spread: bestSellValue - priceOffer.buyPrice,
                    provider: x.providerName,
                }
            }
        })) as ConnectableObservable<PriceSummary>;

        setInterval(() => {
            myObservable$.subscribe((x) =>  JSON.stringify(x));
        }, timeFrame);
        return myObservable$
    }

    addPriceFeed(priceFeed: PriceFeed): boolean {
        let status: boolean;
        let feed$: Observable<PriceFeed> = of(priceFeed);
        feed$.subscribe(val => this._store.push(val));
        this._store.some((x: PriceFeed) => status = x.providerName === priceFeed.providerName);
        return status;
    }

    removePriceFeed(providerName: string): boolean {
        let status: boolean;
        const removeFeed: boolean = this._store
            .some((x) => status = x.providerName.toLowerCase() === providerName.toLowerCase());
        return removeFeed ? (() => {
            this._store = this._store.filter(feed$ => feed$.providerName !== providerName);
            this._store.some((x: PriceFeed) => status = x.providerName !== providerName);
            return status
        })() : status;
    }
}

export {
    PriceStream,
    PriceFeed,
    PriceAggregator,
    TimeFrame,
}
