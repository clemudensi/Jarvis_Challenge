<template>
    <div>
        <b-table striped hover :items="priceFeedStream" :fields="fields"></b-table>
    </div>
</template>

<script>
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
    name: "PriceFeeds",
    props: ['parentPriceFeedStreams'],
    data() {
      return {
        fields: [
          'symbol', 'timestamp',
          { key: 'bestBuyPrice.provider', label: 'Provider'},
          { key: 'bestBuyPrice.value', label: 'Best Buy Price'},
          { key: 'bestSellPrice.value', label: 'Best Sell Price'},
        ],
        priceFeedStream: this.parentPriceFeedStreams
      }
    },
    watch: {
      parentPriceFeedStreams: function(val) {
        this.priceFeedStream = val;
      }
    },
    async mounted(){
      setInterval(() => {
        this.priceFeedStream = this.$subscribeTo(myObservable$, (val) => {
          this.priceFeedStream = val
        })
      }, 60000);

    },

    subscriptions(){
      return {
        priceFeedStream: myObservable$,
      }
    }
  }
</script>

<style scoped>

</style>
