<template lang="html">
  
  <div id="app">

    <header></header>
      <h1>Juan's Mighty Share Portfolio</h1>
      <div>Portfolio Value Goes Here</div>
    </header>

    <main>

      <portfolio-form></portfolio-form>
      <stocks-list :portfolio='portfolio'></stocks-list>  
      <chart-item></chart-item>

    </main>


  </div>

</template>

<script>

import { eventBus } from './main';
import PortfolioForm from "./components/PortfolioForm.vue";
import PortfolioService from "./services/PortfolioService.js";
import StocksList from "./components/StocksList.vue";
import ChartItem from "./components/ChartItem.vue";

export default {
  name: "app",
  components: {
    "stocks-list": StocksList,
    "chart-item": ChartItem,
    "portfolio-form": PortfolioForm
  },
  data() {
    return {
      portfolio: []
    };
  },
  mounted() {
    this.getPortfolio();

    eventBus.$on('added-share', share => {
      this.portfolio.push(share);
    })
  },
  methods: {
    getPortfolio() {
      PortfolioService.getPortfolio()
        .then(portfolio => this.portfolio = portfolio);
    }
  }

};
</script>

<style lang="css" scoped>

</style>