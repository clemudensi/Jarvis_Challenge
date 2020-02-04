<template>
    <div>
        <b-table striped hover :items="feeds" :fields="fields"></b-table>
    </div>
</template>

<script>


    export default {
        name: "PriceFeeds",
        props: ['pricefeeds', 'fields'],
        data() {
            return {
                feeds: this.pricefeeds
            }
        }
    }
</script>

<style scoped>

</style>
