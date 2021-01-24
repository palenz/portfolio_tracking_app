<template lang="html">
  <div>
<div>
  
  <ul>

    <li v-for='share in portfolio'>{{ share.symbol }}, {{ share.shares }}, {{ share.valueAtPurchase }}, {{ share.dateOfPurchase }}</li>

  </ul>


</div>
  </div>
</template>

<script>
export default {
  name: "stocks-list",

  props: ['portfolio']
};
</script>

<style lang="css" scoped>
</style>