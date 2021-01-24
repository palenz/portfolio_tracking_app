<template lang="html">
<div>
  <!-- {{latestStockPrice}} hi -->
  
  <form v-on:submit.prevent='handleStockSubmit'>
    <label for='selected-stock'>Enter New Ticker:</label>
    <input type='text' id="selected-stock" v-model='selectedStock'/>
    <input type='submit' value='Enter Ticker'/>
  </form>

  <p v-if='latestStockPrice'>The latest price for {{selectedStock}} is {{latestStockPrice}}</p>


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
        }
    }

};
</script>

<style lang="css" scoped>
</style>