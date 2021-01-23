<template lang="html">
    <form id="portfolio-form" v-on:submit.prevent="handleSubmit">
        <h2>Add a share to your portfolio</h2>
        <div class="formWrap">
            <label for="ticker">Ticker:</label>
            <select name="ticker" id="ticker-select" v-model="ticker">
                <option value="NFLX">NFLX</option>
                <option value="FB">FB</option>
                <option value="LNKD">LNKD</option>
                <option value="MCD">MCD</option>
                <option value="TSLA">TSLA</option>
            </select>
        </div>
        <div class="formWrap">
            <label for="sharesNumber">Shares Number:</label>
            <input type="number" name="sharesNumber" id="shares-number" v-model.number="sharesNumber">
        </div>
        <div class="formWrap">
            <label for="buyShares">Buy Shares:</label>
            <input type="submit" value="Buy Shares"  name="buyShares" id="buy-shares">
        </div>

    </form>

</template>

<script>

import { eventBus } from '../main.js';
import PortfolioService from '../services/PortfolioService.js';

export default {
    name: 'PortfolioForm',
    data() {
        return {
            ticker: '',
            sharesNumber: null,
        }
    },
    methods: {
        handleSubmit() {
            const share = {
                symbol: this.ticker,
                shares: this.sharesNumber,
            };

            PortfolioService.postShares(share)
                .then(res => {
                    eventBus.$emit('added-share', res)
                })
        }
    }
}
</script>

<style lang="css" scoped>

</style>
