<template lang="html">
  
  <div id="app">

    <header>
      <h1>Juan's Mighty Share Portfolio</h1>
      <div>Portfolio Value Goes Here</div>
    </header>

    <main>

      <stocks-list></stocks-list>  
      <chart-item></chart-item>
      <stock-item :latestStockPrice='latestStockPrice'></stock-item>

    </main>


  </div>

</template>

<script>
import StocksList from "./components/StocksList.vue";
import ChartItem from "./components/ChartItem.vue";
import StockItem from "./components/StockItem.vue";
import { eventBus } from './main.js';

export default {
  name: "app",
  components: {
    "stocks-list": StocksList,
    "chart-item": ChartItem,
    "stock-item": StockItem
  },
  data(){
    return{
      latestStockPrice: null,
      selectedStock: ""
    }
  },
  methods: {
  
    fetchStocks: function(ticker){
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=C6DT0GSGVYAGQ4TA`
    
      fetch(url)
      .then(res => res.json())
      .then(data => {
        const obj = data['Time Series (Daily)'];
        const arr = Object.values(obj);
        const latestEntry = arr[0];
      this.latestStockPrice = latestEntry['4. close']    
    })
  }
  },

  mounted() {
    eventBus.$on('stock-selected', (stock) => {
      this.selectedStock = stock
      this.fetchStocks(this.selectedStock)
      })
      
      

  }
};


</script>

<style lang="css" scoped>
</style>