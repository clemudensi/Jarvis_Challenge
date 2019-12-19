"use strict";
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
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var PriceStream = /** @class */ (function () {
    function PriceStream(initialPriceFeeds) {
        var _this = this;
        this.subject$ = new rxjs_1.Subject();
        this._initialPriceFeeds = initialPriceFeeds;
        this._store = [];
        rxjs_1.of(this._initialPriceFeeds)
            .subscribe(function (item) { return _this._store.push(item); });
    }
    ;
    PriceStream.prototype.getFeedForTimeFrame = function (timeFrame) {
        var ticks = rxjs_1.interval(timeFrame);
        var myObservable$ = ticks.pipe(operators_1.publish());
        myObservable$.connect();
        return myObservable$;
    };
    PriceStream.prototype.addPriceFeed = function (priceFeed) {
        var _this = this;
        var status;
        var feed$ = rxjs_1.of(priceFeed);
        feed$.subscribe(function (val) { return _this._store.push(val); });
        this._store.some(function (x) { return status = x.providerName === priceFeed.providerName; });
        return status;
    };
    PriceStream.prototype.removePriceFeed = function (providerName) {
        var _this = this;
        var status;
        var removeFeed = this._store
            .some(function (x) { return status = x.providerName.toLowerCase() === providerName.toLowerCase(); });
        return removeFeed ? (function () {
            _this._store = _this._store.filter(function (feed$) { return feed$.providerName !== providerName; });
            _this._store.some(function (x) { return status = x.providerName !== providerName; });
            return status;
        })() : status;
    };
    return PriceStream;
}());
exports.PriceStream = PriceStream;
