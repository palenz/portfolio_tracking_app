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
      const sharesSummary = [];

      // Push first object to sharesSummary to allow looping
      sharesSummary.push(this.sharesList[0]);
      // loop through this.sharesList
      // add symbol and shares to new summary array
      for (let i = 1; i < this.sharesList.length; i++) {
        let appendShare = true;
        for (let j of sharesSummary) {
          if (j.symbol === this.sharesList[i].symbol) {
            j.shares += this.sharesList[i].shares;
            appendShare = false;
          } 
        }
        if (appendShare) {
          sharesSummary.push({
            symbol: this.sharesList[i].symbol,
            shares: this.sharesList[i].shares
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