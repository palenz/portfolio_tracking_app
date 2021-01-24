<template lang="html">
  <div>
<div>
  
  <ul>

    <li v-for='share in sharesList'>{{ share.symbol }}, {{ share.shares }}, {{ share.valueAtPurchase }}, {{ share.dateOfPurchase }}</li>

  </ul>


</div>
  </div>
</template>

<script>
export default {
  name: "stocks-list",

  props: ['portfolio'],

  computed: {
    sharesList: function () {
      return this.portfolio.filter(function (item, index) {
        return !item.name 
      } )
    },

    sharesSummary: function() {
      const sharesSummary = [];

      for (let share of this.sharesList) {
        sharesSummary.push({
          symbol: share.symbol,
          shares: share.shares
        })
        
      }
      // newArray = [
        // {
        //   symbol: KO,
        //   shares: 5
        // }
      // ]

      // loop through this.sharesList
        // create an object with 2 keys symbol and shares
      // add symbol and shares to new summary array
      // if symbol exists, add shares
      // if symbol does not exist, add symbol and shares

      return sharesSummary
  }
  }
};
</script>

<style lang="css" scoped>
</style>