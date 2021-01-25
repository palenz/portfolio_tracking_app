<template lang="html">
  
  <div id="app">

    <header></header>
      <button @click="darkThemeSwitch">Switch Theme</button>
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
    },
    _addDarkTheme() {
      let darkThemeLinkEl = document.createElement("link");
      darkThemeLinkEl.setAttribute("rel", "stylesheet");
      darkThemeLinkEl.setAttribute("href", "/css/darktheme.css");
      darkThemeLinkEl.setAttribute("id", "dark-theme-style");

      let docHead = document.querySelector("head");
      docHead.append(darkThemeLinkEl);
    },
    _removeDarkTheme() {
      let darkThemeLinkEl = document.querySelector("#dark-theme-style");
      let parentNode = darkThemeLinkEl.parentNode;
      parentNode.removeChild(darkThemeLinkEl);
    },
    darkThemeSwitch() {
      let darkThemeLinkEl = document.querySelector("#dark-theme-style");
      if (!darkThemeLinkEl) {
        this._addDarkTheme()
      } else {
        this._removeDarkTheme()
    }
    },
  }

};
</script>

<style lang="css" scoped>

</style>