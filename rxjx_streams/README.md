## Price Feed stream using RxJS observables

### Overview
Implement a system that simulates arbitrage 
- A market strategy that aims to profit from small differences in prices of 
similar or identical assets, involving the simultaneous purchase of an asset 
from one market and its sale on another market at a higher price.

### The Interface

```js
    getFeedForTimeFrame(timeFrame: TimeFrame): ConnectableObservable<PriceSummary>;
```
 
 /**
     * [CORE CHALLENGE OBJECTIVE]
     * Returns `ConnectableObservable<PriceSummary>` - a stream that "ticks"
     * every `timeFrame` seconds. Each tick produces a new data point
     * containing the best buy and sell price offered during the past
     * `timeFrame` seconds.
 */
 
 ```js
    addPriceFeed(priceFeed: PriceFeed): boolean;
 ```
 
  /*
      * Adds a new price feed to the aggregator instance.
      *
      * The aggregator instance immediately connects to the newly added price feed
      * add existing users holding reference to `getFeedForTimeFrame`
      *
      * Returns `true` on success or `false` if a price feed with the same
      * `providerName` as the one passed as argument exists.
  */
  
  
  ```js
    removePriceFeed(providerName: string): boolean;
 ```
  
  /*
       * Removes the price feed with the specified `providerName`.
       *
       * Returns `true` on success or `false` if a price feed with the specified
       * name does not exist.
   */


