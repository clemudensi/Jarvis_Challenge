<template>
  <div id="app" class="container-fluid">
      <PriceFeeds/>
      <AddPriceFeed/>
  </div>
</template>

<script>
import PriceFeeds from "./components/PriceFeeds";
import AddPriceFeed from "./components/AddPriceFeed";

export default {
  name: 'app',
  components: {
    PriceFeeds,
    AddPriceFeed,
  }
}
</script>

