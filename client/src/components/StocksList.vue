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
      // new array to push to
      const sharesSummary = [{
        symbol: "TWTR",
        shares: 10
      }];

      // loop through this.sharesList
      // add symbol and shares to new summary array
      for (let share of this.sharesList) {
        let appendShare = true;
        for (let i of sharesSummary) {
          if (i.symbol === share.symbol) {
            i.shares += share.shares;
            appendShare = false;
          } 
        }
        if (appendShare) {
          sharesSummary.push({
            symbol: share.symbol,
            shares: share.shares
          })
        }
      // if symbol exists, add shares
      // if symbol does not exist, add symbol and shares
        
      }
      

      return sharesSummary;
  }
  }
};
</script>

<style lang="css" scoped>
</style>