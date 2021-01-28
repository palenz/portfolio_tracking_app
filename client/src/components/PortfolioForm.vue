<template lang="html">

<div class="search-company">

        <h2>Search for a company</h2>
        <form id="portfolio-form" v-on:submit.prevent="handleSubmit">
            <label for="ticker" class="header">Enter company ticker:</label>
            <input type='text' name="ticker" id="ticker-select" v-model='userInput'>
            <input type="submit" value="Search"  name="buyShares" id="buy-shares">
        </form>
        <h2 v-if="selectedStock">The selected company is {{selectedStock}}</h2>

</div>

</template>

<script>

import { eventBus } from '../main.js';

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
    }
}

</script>

<style lang="css" scoped>

</style>