<template lang="html">
  
  <div id="app">

    <header>
      <h1>Juan's Mighty Share Portfolio</h1>
      <div>Portfolio Value Goes Here</div>
    </header>

    <main>

      <stocks-list></stocks-list>  
      <chart-item></chart-item>
      <stock-item></stock-item>

    </main>

  </div>

</template>

<script>
import StocksList from "./components/StocksList.vue";
import ChartItem from "./components/ChartItem.vue";
import StockItem from "./components/StockItem.vue";
import { eventBus } from './main.js';
import keys from '../.env/keys.js'

export default {
  name: "app",
  components: {
    "stocks-list": StocksList,
    "chart-item": ChartItem,
    "stock-item": StockItem
  },
  data(){
    return{
      singleStockData: null,
      portfolioLimitedPerformance: []
    }
  },
  methods: {

    obj: function stockObject(ticker, performance) {
        this.ticker = ticker;
        this.performance = performance
    },
    

    fetchStockData: function(ticker){
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${keys.key1}`
      fetch(url)
      .then(res => res.json())
      .then(data => {
        let objOfDays = data["Time Series (Daily)"]

        for (let day in objOfDays){
          var performance = { date: day, price: objOfDays[day]["4. close"] };
          console.log(performance)

          var stock = {ticker: ticker, performance: performance};
          console.log(stock)
          this.portfolioLimitedPerformance.push(stock)
        }
      })
    }
  },

  mounted() {
    this.fetchStockData('AAPL')    
  }
};


</script>

<style lang="css" scoped>
</style>