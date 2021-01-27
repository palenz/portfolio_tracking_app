<template lang="html">
<div v-if='selectedStock'>
  

    <form id="portfolio-form" v-on:submit='handleBuyStock'>
        <h2>Buy shares of {{selectedStock}}</h2>
        
            <label for="sharesNumber">Number of shares:</label>
            <input type="number" name="sharesNumber" id="shares-number" v-model.number="numberOfShares">

            <label for="buyShares"></label>
            <input type="submit" value="Buy Shares"  name="buyShares" id="buy-shares">

    </form>

</div>
</template>

<script>
import { eventBus } from '../main.js';
import PortfolioService from '../services/PortfolioService.js';
import datePurchased from '../models/datePurchased.js';

export default {
    
    name: 'stock-item',
    props: ['stockLimitedPerformance'],
    
    data () {
        return {
        selectedStock: '',
        numberOfShares: null,
        latestPrice: null
        }
    },

    methods: {
        getPrices: function (ticker) { 
        },
        
        gatherLimitedPerformance: function (ticker){
            oneHundredDays = [];
            oneHundredDays.push()
        },
        handleBuyStock() {
            const todaysDate = datePurchased.getTodaysDate();
            
            const share = {
                symbol: this.selectedStock,
                shares: this.numberOfShares,
                dateOfPurchase: todaysDate,
                valueAtPurchase: this.stockLimitedPerformance['performance'][0]['price']
            };
            PortfolioService.postShares(share)
                .then(res => {
                    eventBus.$emit('added-share', res)
                })
        }
        
           
    },
    mounted(){
        eventBus.$on('selected-stock', (selectedStock) => {
            this.selectedStock = selectedStock
        })
    }
};
</script>

<style lang="css" scoped>
</style>