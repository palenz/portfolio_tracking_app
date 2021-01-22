<template lang="html">
  
  <div id="app">

    <header>
      <h1>Juan's Mighty Share Portfolio</h1>
      <div>Portfolio Value Goes Here</div>
    </header>

    <main>

      <stocks-list></stocks-list>  
      <chart-item></chart-item>

    </main>


  </div>

</template>

<script>
import StocksList from "./components/StocksList.vue";
import ChartItem from "./components/ChartItem.vue";
export default {
  name: "app",
  components: {
    "stocks-list": StocksList,
    "chart-item": ChartItem,
  },
};
</script>

<style lang="css" scoped>
</style>