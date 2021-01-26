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
      <stock-item></stock-item>

    </main>

  </div>

</template>

<script>

import { eventBus } from './main';
import PortfolioForm from "./components/PortfolioForm.vue";
import PortfolioService from "./services/PortfolioService.js";
import StocksList from "./components/StocksList.vue";
import ChartItem from "./components/ChartItem.vue";
import StockItem from "./components/StockItem.vue";
import keys from '../.env/keys.js'

export default {
  name: "app",
  components: {
    "stocks-list": StocksList,
    "chart-item": ChartItem,
    "stock-item": StockItem,
    "portfolio-form": PortfolioForm

  },
  data(){
    return{
      stockLimitedPerformance: [],
      portfolio: [],
      selectedStock: null
    }
  },

  methods: {
    fetchStockData: function(ticker){
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${keys.key1}`
      fetch(url)
      .then(res => res.json())
      .then(data => {
        let objOfDays = data["Time Series (Daily)"]
        const performanceArray = []
        for (let day in objOfDays){
          var performance = { date: day, price: objOfDays[day]["4. close"] };
          performanceArray.push(performance)
        }
        var stock = {ticker: ticker, performance: performanceArray}
        this.stockLimitedPerformance = stock
      })
    },

    getPortfolio() {
      PortfolioService.getPortfolio()
        .then(portfolio => this.portfolio = portfolio);
    }
  },

  watch:{
    selectedStock(val){
      this.fetchStockData(val)
    }
  },

  mounted() {
    
    this.getPortfolio();
  
    eventBus.$on('selected-stock', (selectedStock) => {
    this.selectedStock = selectedStock
    
    })

  }

};


</script>

<style lang="css" scoped>

</style>