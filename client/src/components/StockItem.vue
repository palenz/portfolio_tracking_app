<template lang="html">
<!-- <div>

    <p>The selected company is {{selectedStock}}</p>

</div> -->
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