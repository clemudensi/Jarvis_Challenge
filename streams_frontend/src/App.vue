<template>
  <div id="app" class="container-fluid">
      <PriceFeeds
        v-bind:pricefeeds="myObservable$"
        v-bind:fields="fields"
      />
      <AddPriceFeed/>
  </div>
</template>

<script>
import PriceFeeds from "./components/PriceFeeds";
import AddPriceFeed from "./components/AddPriceFeed";
import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'

// arbitrary value for priceOffer
const priceOffer = {
  buyPrice: 120,
  sellPrice: 125
};

// arbitrary value for bestBuy and bestSell
const bestBuyValue = 122;
const bestSellValue = 123;

const source$ = ajax.getJSON(`http://localhost:80/api/pricefeeds`);
const myObservable$ = source$.pipe(map(({priceFeeds}) => {
  return (
    priceFeeds.map((priceFeed) => ({
      symbol: priceFeed.symbol,
      timestamp: new Date,
      bestBuyPrice: {
        value: bestBuyValue,
        spread: bestBuyValue - priceOffer.sellPrice,
        provider: priceFeed.providerName,
      },
      bestSellPrice: {
        value: bestSellValue,
        spread: bestSellValue - priceOffer.buyPrice,
        provider: priceFeed.providerName,
      }
    }))
  )
}));

export default {
  name: 'app',
  components: {
    PriceFeeds,
    AddPriceFeed,
  },

  data(){
    return {
      fields: [
        'symbol', 'timestamp',
        { key: 'bestBuyPrice.provider', label: 'Provider'},
        { key: 'bestBuyPrice.value', label: 'Best Buy Price'},
        { key: 'bestSellPrice.value', label: 'Best Sell Price'},
      ],
      myObservable$
    }
  },
  async mounted(){
    setInterval(() => {
      this.$subscribeTo(myObservable$, (val) => {
        return  val
      })
    }, 600000)
  },
  subscriptions(){
    return {
      myObservable$,
    }
  }
}
</script>

