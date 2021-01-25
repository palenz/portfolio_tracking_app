<template lang="html">
<div>
  
  <form v-on:submit.prevent='handleStockSubmit'>
    <label for='selected-stock'>Enter New Ticker:</label>
    <input type='text' id="selected-stock" v-model='selectedStock'/>
    <input type='submit' value='Enter Ticker'/>
  </form>

  <p v-if='latestStockPrice'>The latest price for {{selectedStock}} is {{latestStockPrice}}
      <button v-on:click=getPrices>Save the last 100 prices</button>
  </p>



</div>
</template>

<script>
import { eventBus } from '../main.js';

export default {
    
    name: 'stock-item',
    
    props: ['latestStockPrice'],
    
    data () {
        return {
        selectedStock: ''
        }
    },

    methods: {
        handleStockSubmit(){
            eventBus.$emit('stock-selected', this.selectedStock)
        },
        
        getPrices: function (ticker) {
        
        },
        
        gatherLimitedPerformance: function (ticker){
            oneHundredDays = [];
            oneHundredDays.push()
        }
        
        
    }

};
</script>

<style lang="css" scoped>
</style>