<template>
  <div id="growth-graph">
      GRAPH
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
    props: ["shareSummary", "portfolio"]
}
</script>

<style>

</style>