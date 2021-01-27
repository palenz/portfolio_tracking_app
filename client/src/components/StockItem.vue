<template lang="html">
<div>
  
    <p>The selected company is {{selectedStock}}</p>

    <form id="portfolio-form" v-on:submit='handleBuyStock'>
        <h2>Add a share to your portfolio</h2>
        
            <label for="sharesNumber">Number of shares:</label>
            <input type="number" name="sharesNumber" id="shares-number" v-model.number="numberOfShares">

            <label for="buyShares">Buy</label>
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
    props: ['latestStockPrice', 'stockLimitedPerformance'],
    
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