<template lang="html">

<div>

<h2>Search for a company</h2>
        <form id="portfolio-form" v-on:submit.prevent="handleSubmit">
            <label for="ticker">Enter company ticker:</label>
            <input type='text' name="ticker" id="ticker-select" v-model='userInput'>
            <input type="submit" value="Search"  name="buyShares" id="buy-shares">
        </form>

</div>

</template>
<script>

import { eventBus } from '../main.js';
import PortfolioService from '../services/PortfolioService.js';
import datePurchased from '../models/datePurchased.js';

export default {
    name: 'PortfolioForm',
    data() {
        return {
            selectedStock: null,
            sharesNumber: null,
            userInput: ''
        }
    },
    methods: {
        handleSubmit(){
            this.selectedStock = this.userInput
            this.userInput = ''
            eventBus.$emit('selected-stock', this.selectedStock)
        }
        
        // handleSubmit() {
        //     const todaysDate = datePurchased.getTodaysDate();
            
        //     const share = {
        //         symbol: this.ticker,
        //         shares: this.sharesNumber,
        //         dateOfPurchase: todaysDate
                
        //     };

        //     PortfolioService.postShares(share)
        //         .then(res => {
        //             eventBus.$emit('added-share', res)
        //         })
        // }
    }
}
</script>

<style lang="css" scoped>

</style>