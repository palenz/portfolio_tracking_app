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
    }
  }
};
</script>

<style lang="css" scoped>
</style>