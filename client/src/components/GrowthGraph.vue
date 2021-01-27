<template>
  <div id="growth-graph">
      GRAPH
      <button v-on:click="getTotalInvestedValue(shareSummary.symbol)">Get Values</button>
  </div>
</template>

<script>


export default {
    name: "growth-graph",
    
    data(){
        return{
            currentTotalShareValue: this.shareSummary.latestPrice * this.shareSummary.shares,
            investedTotalShareValue: null
        }
    },
    props: ["shareSummary", "portfolio"],
    methods: {
        getTotalInvestedValue: function(symbol){
            const filterPortfolio = this.portfolio.filter((share) => {
                return share.symbol === symbol;
            })
            console.log(filterPortfolio)
            let totalValue = 0;
            for (let share of filterPortfolio){
                totalValue += share.valueAtPurchase * share.shares;
            }
            this.investedTotalShareValue = parseFloat(totalValue.toFixed(2));
        }
    },
    mounted(){
        this.getTotalInvestedValue(this.shareSummary.symbol);
    }
}
</script>

<style>

</style>